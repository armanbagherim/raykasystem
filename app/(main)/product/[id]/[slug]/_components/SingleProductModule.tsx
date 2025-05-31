"use client";
import React, { useEffect, useState } from "react";
import {
  Backtitle,
  Zoomin,
  Play,
  Goldstart,
  Category2,
  BookmarkAdd,
  BookmarkRemove,
} from "@/app/components/design/Icons";

import ProductCard from "@/app/components/design/Cards/ProductCard/ProductCard";
import Slider from "@/app/components/design/Slider";
import Variants from "./variants";
import Inventories from "./inventories";
import LeftSide from "./LeftSide";
import Breadcrumb from "@/app/components/design/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { setQty } from "@/store/features/cartSlice";
import { Link as Links, animateScroll as scroll } from "react-scroll";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Comments from "./Comments";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import ProductGallary from "@/app/components/ProductGallary";
import { useRouter } from "next/navigation";
import CountDown from "@/app/components/design/CountDown";
export default function SingleProductModule({
  product,
  related,
  cook,
  session,
  comments,
  favStatus,
  linked
}) {
  const [open, setOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const [localInventories, setLocalInventories] = useState(
    product?.inventories?.filter(
      (inventory, index, self) =>
        index === self.findIndex((t) => t.vendor.id === inventory.vendor.id)
    )
  );
  const [loading, setLoading] = useState(false);
  const [isBookmark, setIsBookmark] = useState(favStatus?.result);
  const [favLoading, setFavLoading] = useState(false);

  const router = useRouter();
  const handleVariantChange = (colorId: number) => {
    const filtered = product?.inventories?.filter(
      (inventory, index, self) => inventory.colorId === colorId
    );

    setLocalInventories([...filtered]);
  };

  useEffect(() => { }, [localInventories]);

  useEffect(() => {
    const uniqueInventories = product?.inventories?.filter(
      (inventory, index, self) =>
        index === self.findIndex((t) => t.vendor.id === inventory.vendor.id)
    );

    setLocalInventories(uniqueInventories);
  }, [product?.inventories]);

  const addToCart = async (inventoryId) => {
    const id = toast.loading("در حال افزودن موجودی");
    const method = "POST";
    const headers = {
      "x-session-id": cook?.value,
      "Content-Type": "application/json",
    };

    if (session) {
      headers.Authorization = `Bearer ${session?.token}`;
    }

    const body = JSON.stringify({
      inventoryId: +inventoryId,
      qty: 1,
    });

    const requestConfig = {
      method: method,
      headers: headers,
      body: body,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks`,
        requestConfig
      );

      if (!response.ok) {
        // Parse the response body to extract the error message
        const errorData = await response.json();
        const errorMessage = errorData?.message || "An error occurred";

        // Show error toast
        toast.update(id, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
      } else {
        // If the first fetch is successful, make the second fetch
        const countResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks/count`,
          {
            method: "GET",
            headers: {
              "x-session-id": cook.value,
            },
          }
        );

        if (!countResponse.ok) {
          // Handle error for the second fetch
          const countErrorData = await countResponse.json();
          const countErrorMessage =
            countErrorData?.message || "Failed to fetch stock count";

          toast.update(id, {
            render: countErrorMessage,
            type: "error",
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
          });
        } else {
          const countData = await countResponse.json();
          dispatch(
            setQty({
              qty: countData.result,
            })
          );
          setShowModal(true);

          // Show success toast
          toast.update(id, {
            render: "اضافه شد",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
          });
        }
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("An unexpected error occurred:", error);
      toast.update(id, {
        render: "An unexpected error occurred",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setVideoOpen(false);
  };

  const handleVideoOpen = () => {
    setVideoOpen(true);
  };

  const AddToBookmark = async () => {
    if (!session) {
      router.push(
        `/login?redirect_back_url=/product/${product?.sku}/${product?.slug}`
      );
      return;
    }
    setFavLoading(true);
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/productFavorites`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: +product.id,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setIsBookmark(true);
          setFavLoading(false);
        });
    } catch (error) {
      throw Error("bye");
    }
  };

  const RemoveBookmark = async () => {
    if (!session) {
      router.push(
        `/login?redirect_back_url=/product/${product?.sku}/${product?.slug}`
      );
      return;
    }
    setFavLoading(true);
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/productFavorites/product/${product?.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setIsBookmark(false);
          setFavLoading(false);
        });
    } catch (error) {
      throw Error("bye");
    }
  };

  return (
    <>
      {showModal && (
        <div className="bg-black/40 fixed top-0 bottom-0 left-0 right-0 z-[999999] flex items-center justify-center">
          <div className="bg-white !p-4 rounded-2xl w-3/4 sm:w-2/4">
            <div className="flex flex-wrap flex-col gap-5">
              <div className="flex gap-4 mb-4 items-center">
                <Image
                  className=""
                  height={"50"}
                  alt={product?.title}
                  loading="eager"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/products/${product?.attachments[0]?.fileName}`}
                  width="50"
                />
                <span className="text-sm sm:text-lg">
                  <span className="text-primary">{product?.title}</span> به سبد
                  شما اضافه شد
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <Link
                  className="bg-white border border-primary  block w-full flex-1 !p-3 text-primary text-center rounded-xl"
                  onClick={(e) => setShowModal(false)}
                  href="#"
                >
                  بستن
                </Link>
                <Link
                  className="bg-primary block w-full flex-1 !p-3 text-center text-white rounded-xl"
                  href="/cart"
                  onClick={(e) => {
                    setLoading(true);
                  }}
                >
                  {loading ? (
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-transparent animate-spin dark:text-gray-600 fill-white mx-auto"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    " سبد خرید"
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <Breadcrumb product={product} />
      <div className="container mx-auto">
        {product.inventories[0]?.firstPrice?.appliedDiscount ? (
          <div className="flex justify-between bg-primary items-center rounded-xl p-2 pr-4">
            <h5 className="text-white peyda text-md font-bold">
              تخفیف شگفت انگیز
            </h5>
            <CountDown
              dates={
                product.inventories[0]?.firstPrice?.appliedDiscount?.endDate
              }
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="container justify-center mx-auto grid grid-cols-12 gap-4 md:gap-4 !p-4 !md:p-8 lg:p-0">
        <div className="col-span-12 lg:col-span-4 border-0 rounded-2xl relative bg-white py-4">
          <div className="flex">
            <div className="w-10 pb-4 absolute lg:opacity-100 -right-4 -top-4 md:r-0 t-0 mt-4 mr-3 rounded-3xl bg-customGray z-[5] md:z-20">
              <div className="pt-3.5 mr-3">
                <span className="cursor-pointer" onClick={handleClickOpen}>
                  <Zoomin />
                </span>
              </div>
              {product?.videoAttachments.length !== 0 && (
                <div
                  className="pt-5 mr-3 cursor-pointer"
                  onClick={handleVideoOpen}
                >
                  <Link href="#">
                    <Play />
                  </Link>
                </div>
              )}

              <div className="relative pt-5 mr-3 cursor-pointer">
                {favLoading && (
                  <div className="absolute -right-[4px] top-[13px]  bg-customGray ">
                    <CircularProgress color="success" size="25px" />
                  </div>
                )}

                {isBookmark ? (
                  <span
                    className="cursor-pointer"
                    onClick={(e) => RemoveBookmark()}
                  >
                    <BookmarkRemove />
                  </span>
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={(e) => AddToBookmark()}
                  >
                    {" "}
                    <BookmarkAdd />
                  </span>
                )}
              </div>
              {/* <div className="pt-5 mr-3">
              <Link href="#">
                <Heartadd />
              </Link>
            </div>
            
             */}
            </div>
          </div>

          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullScreen
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                left: 8,
                top: 8,
                zIndex: 2000,
                color: (theme) => theme.palette.grey[800],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers className="flex items-center">
              {product?.attachments.length ? (
                <ProductGallary slidesPerView={1}>
                  {product?.attachments.map((value, key) => (
                    <div key={key} className="text-center mb-8">
                      <Image
                        className="mx-auto"
                        height={"600"}
                        alt={product?.title}
                        loading="eager"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL
                          }/products/${value?.fileName ?? null}`}
                        width="600"
                      />
                    </div>
                  ))}
                </ProductGallary>
              ) : (
                <Image
                  width={500}
                  height={500}
                  className="w-full border border-gray-200 rounded-2xl mb-2"
                  src="/images/no-photo.png"
                  alt=""
                />
              )}
            </DialogContent>
          </Dialog>

          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={videoOpen}
            fullScreen
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                left: 8,
                top: 8,
                zIndex: 2000,
                color: (theme) => theme.palette.grey[800],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers className="flex items-center">
              <Slider slidesPerView={1}>
                {product?.videoAttachments.map((value, key) => (
                  <div
                    key={key}
                    className="text-center mb-8"
                    itemScope
                    itemType="https://schema.org/VideoObject"
                  >
                    <video
                      className="w-2/3 h-auto mx-auto"
                      controls
                      src={`https://image.jahizan.com/productvideos/${value?.fileName ?? null
                        }`}
                      itemProp="contentUrl"
                    ></video>
                    <meta itemProp="name" content={product?.title ?? null} />
                    <meta
                      itemProp="description"
                      content={product?.metaDescription ?? null}
                    />
                    <meta
                      itemProp="thumbnailUrl"
                      content={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/products/${product?.attachments[0]?.fileName}`}
                    />
                    <meta itemProp="uploadDate" content={product?.createdAt} />
                  </div>
                ))}
              </Slider>
            </DialogContent>
          </Dialog>

          <div className="p-3 pt-0 mr-0 pb-0 md:pb-6">
            {product?.attachments.length ? (
              <Slider slidesPerView={1}>
                {product?.attachments.map((value, key) => (
                  <Image
                    onClick={handleClickOpen}
                    key={key}
                    className="w-full"
                    height={"500"}
                    alt={product?.title}
                    loading="eager"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/products/${value?.fileName ?? null
                      }`}
                    width="500"
                  />
                ))}
              </Slider>
            ) : (
              <Image
                width={500}
                height={500}
                className="w-full border border-gray-200 rounded-2xl mb-2"
                src="/images/no-photo.png"
                alt=""
              />
            )}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 rounded-2xl bg-white p-5">
          <div className="flex justify-between items-center">
            <h1 className="text-right peyda text-2xl text-[#424242] font-bold">
              {product?.title}
            </h1>
          </div>
          {linked.statusCode !== 404 && <Link href={`/${linked.result.entityType.slug}/${linked.result.brand.slug}`} className="text-right text-primary pb-2 border-b-primary border-b font-normal text-sm mt-2">
            {linked.result.entityType.name} {linked.result.brand.name}
          </Link>}



          <div>
            <div className="flex gap-4 justify-center mx-auto">
              <div className="mt-5 w-60 bg-customGray rounded-2xl">
                <div className="py-4 mr-3 flex gap-2 text-slate-500">
                  <div className="pt-0.5">
                    <Goldstart />
                  </div>
                  <div>
                    {" "}
                    {Number(product?.score ?? 0).toFixed(1)} از{" "}
                    {product?.cntComment ?? 0} نظر
                  </div>
                </div>
              </div>
              <div className="mt-5 w-2/3  bg-customGray rounded-2xl">
                <div className="py-4 mr-3 flex gap-2 text-slate-500">
                  <div className="pt-1">
                    <Category2 />
                  </div>
                  <div className="flex gap-1">
                    <div className="font-bold">برند: </div>
                    <div>
                      <Link href={`/brand/${product?.brand?.slug}`}>
                        {product?.brand?.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 w-auto mb-8 bg-customGray rounded-2xl">
              <div className="py-4 mr-3 flex gap-2 text-slate-500">
                <div className="pt-0.5">
                  <Category2 />
                </div>
                <div className="flex gap-1">
                  <div className="font-bold">دسته: </div>
                  <div>
                    <Link href={`/category/${product?.entityType?.slug}`}>
                      {product?.entityType?.name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Variants
            handleVariantChange={handleVariantChange}
            product={product}
          />
          {product?.productAttributeValues ? (
            <div>
              <p className="mb-4 peyda text-lg font-bold">مشخصات مفید</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product?.productAttributeValues
                  .slice(0, 5)
                  .map((value, index) => {
                    // Render the first 5 items normally
                    return (
                      <span
                        className="flex flex-col py-4 px-4 flex-1 bg-[#f8f8f8] rounded-xl"
                        key={index}
                      >
                        <div className="text-sm">
                          {value?.attribute?.name ?? ""}
                        </div>
                        <div className="text-primary text-sm font-bold">
                          {value?.val ?? "-"}
                        </div>
                      </span>
                    );
                  })}
                {product?.productAttributeValues.length > 5 && (
                  // Add this only if there are more than 5 items
                  <a
                    href={"#attributes"}
                    className="flex flex-col py-4 items-center justify-center cursor-pointer px-4 flex-1 bg-[#f1f1f1] rounded-xl"
                  >
                    <div className="text-sm text-center">موارد بیشتر</div>
                  </a>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <LeftSide
          product={localInventories}
          status={product?.inventoryStatus?.id}
          addToCart={addToCart}
        />
      </div>

      <Inventories
        addToCart={addToCart}
        inventoryStatusId={product?.inventoryStatus}
        product={localInventories}
      />

      <div className="container mx-auto">
        <div className=" gap-10 rounded-3xl whitespace-nowrap overflow-x-auto sticky top-0 bg-white z-[8] !p-5 flex">
          {product?.description ? (
            <Links
              activeClass="text-red-500 border-b border-b-red-500 pb-2 font-bold"
              className="text-gray-500 cursor-pointer"
              to="review"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              نقد و بررسی محصول
            </Links>
          ) : (
            ""
          )}

          <Links
            activeClass="text-red-500 border-b border-b-red-500 pb-2 font-bold"
            className="text-gray-500 cursor-pointer"
            to="attributes"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            مشخصات محصول
          </Links>
          <Links
            activeClass="text-red-500 border-b border-b-red-500 pb-2 font-bold"
            className="text-gray-500 cursor-pointer"
            to="commentSection"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            نظرات
          </Links>
        </div>

        {product?.description ? (
          <div
            id="review"
            className="container mx-auto mt-5  rounded-3xl bg-white !p-8 w-auto"
          >
            <div className="flex gap-7">
              <div
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div id="attributes" className=" mt-4 gap-10 rounded-3xl bg-white">
          <div className="p-8">
            <div className="font-bold text-[#424242] text-sm">
              مشخصات کامل محصول
            </div>
            <div className="mt-4 text-sm specialInfos">
              {product?.productAttributeValues.map((value, key) => {
                return (
                  <div
                    className="flex justify-between md:justify-normal pt-3 pb-3"
                    key={key}
                  >
                    <div className="text-primary min-w-56 pr-4">
                      {value?.attribute?.name ?? ""}
                    </div>
                    <div className="mr-10 text-slate-600">
                      {value?.val ?? "-"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Comments
          comments={comments?.result}
          total={comments?.total}
          product={product}
          session={session}
        />
        <div className="relative container mx-auto mt-4 gap-10  rounded-3xl bg-white !p-8">
          <div className="flex pb-5 relative">
            <div className="absolute">
              <Backtitle />
            </div>
            <div className="font-bold text-2xl items-center !p-3 text-primary">
              محصولات مرتبط
            </div>
          </div>

          <Slider>
            {related.map((value, key) => (
              <ProductCard
                key={key}
                data={value ?? null}
                type="main"
                className="w-full sm:w-1/2 lg:w-1/3"
              />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
