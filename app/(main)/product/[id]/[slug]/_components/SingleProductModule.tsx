"use client";
import React, { useEffect, useState } from "react";
import {
  Cart,
  Backtitle,
  Zoomin,
  Heartadd,
  Play,
  Goldstart,
  Category2,
  Smallcat,
  Toogle,
  Infocircle,
  Tickcircle,
  Tickstarwhite,
  Exclamationreport,
  Like,
  Unlike,
} from "@/app/components/design/Icons";
import ReactImageZoom from "react-image-zoom";

import ProductCard from "@/app/components/design/Cards/ProductCard/ProductCard";
import Slider from "@/app/components/design/Slider";
import ImageZoom from "react-image-zooom";
import Variants from "./variants";
import Inventories from "./inventories";
import LeftSide from "./LeftSide";
import Breadcrumb from "@/app/components/design/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  decrement,
  increment,
  productQtyInCartSelector,
  setQty,
} from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Comments from "./Comments";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import ProductGallary from "@/app/components/ProductGallary";
export default function SingleProductModule({
  product,
  related,
  cook,
  session,
}) {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const [localInventories, setLocalInventories] = useState([]);
  const [loading, setLoading] = useState(false);
  // const qty = useAppSelector((state) =>
  //   productQtyInCartSelector(state, inventory.id)
  // );

  const handleVariantChange = (colorId: number) => {
    const filtered = product.inventories.filter(
      (inventory, index, self) => inventory.colorId === colorId
    );

    setLocalInventories([...filtered]); // Ensure immutability
  };

  useEffect(() => {}, [localInventories]);

  useEffect(() => {
    const uniqueInventories = product.inventories.filter(
      (inventory, index, self) =>
        index === self.findIndex((t) => t.vendor.id === inventory.vendor.id)
    );

    setLocalInventories(uniqueInventories); // Ensure immutability
  }, [product.inventories]);

  const addToCart = (inventoryId) => {
    const id = toast.loading("در حال افزودن موجودی");
    const method = "POST";
    const headers = {
      "x-session-id": cook.value,
      "Content-Type": "application/json",
    };

    // Conditionally add the Authorization header if session exists
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
    //do something else
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks`,
        requestConfig
      ).then((res) => {
        if (!res.ok) {
          toast.update(id, {
            render: "این محصول موجودی ندارد",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
          });
          //   throw Error(res.errors);
        } else {
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks/count`,
            {
              method: "GET",
              headers: {
                "x-session-id": cook.value,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              dispatch(
                setQty({
                  qty: data.result,
                })
              );
              setShowModal(true);
              toast.update(id, {
                render: "اضافه شد",
                type: "success",
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
              });
            });
        }
      });
    } catch (error) {
      throw Error("bye");
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {showModal && (
        <div className="bg-black/40 fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center">
          <div className="bg-white !p-4 rounded-2xl w-3/4 sm:w-2/4">
            <div className="flex flex-wrap flex-col gap-5">
              <div className="flex gap-4 mb-4 items-center">
                <Image
                  className=""
                  height={"50"}
                  alt="تصویر بنر"
                  loading="eager"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productphotos/image/${product?.attachments[0].fileName}`}
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
                  onClick={(e) => setLoading(true)}
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
      <div className="container justify-center mx-auto mt-3 grid grid-cols-12 gap-8 !p-8 lg:p-0">
        <div className="col-span-12 lg:col-span-4 border-0 rounded-lg relative">
          <div className="w-10 h-32 absolute opacity-0 lg:opacity-100 r-0 t-0 mt-4 mr-3 rounded-3xl bg-customGray z-20">
            <div className="pt-3.5 mr-3">
              <span className="cursor-pointer" onClick={handleClickOpen}>
                <Zoomin />
              </span>
            </div>
            <div className="pt-5 mr-3">
              <Link href="#">
                <Heartadd />
              </Link>
            </div>
            <div className="pt-5 mr-3">
              <Link href="#">
                <Play />
              </Link>
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
                        alt="تصویر بنر"
                        loading="eager"
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productphotos/image/${value.fileName}`}
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
          <div className="p-3  pt-0 mr-0 pb-6">
            {product?.attachments.length ? (
              <Slider slidesPerView={1}>
                {product?.attachments.map((value, key) => (
                  <Image
                    onClick={handleClickOpen}
                    key={key}
                    className="w-full"
                    height={"500"}
                    alt="تصویر بنر"
                    loading="eager"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productphotos/image/${value.fileName}`}
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

        <div className="col-span-12 lg:col-span-5 rounded-lg">
          <h1 className="text-right font-normal text-2xl text-slate-500">
            {product.title}
          </h1>
          <div className="text-right font-normal text-sm mt-2 text-slate-400">
            {product.slug.replace(/-/g, " ")}
          </div>

          <div>
            <div className="flex gap-4 justify-center mx-auto">
              <div className="mt-5 w-60 bg-customGray rounded-2xl">
                <div className="py-4 mr-3 flex gap-2 text-slate-500">
                  <div className="pt-0.5">
                    <Goldstart />
                  </div>
                  <div>4.75 از 4240 نظر</div>
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
                  <div className="justify-start mx-auto ml-2">
                    <div className="pt-0.5 justify-center flex mx-auto w-12 bg-slate-50 rounded-xl">
                      <Smallcat />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 w-auto  bg-customGray rounded-2xl">
              <div className="py-4 mr-3 flex gap-2 text-slate-500">
                <div className="pt-0.5">
                  <Category2 />
                </div>
                <div className="flex gap-1">
                  <div className="font-bold">دسته: </div>
                  <div>
                    <Link href={`/category/${product.entityType.slug}`}>
                      {product.entityType.name}
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
        </div>
        <LeftSide
          product={localInventories}
          status={product.inventoryStatus.id}
          addToCart={addToCart}
        />
      </div>

      <Inventories
        addToCart={addToCart}
        inventoryStatusId={product.inventoryStatus}
        product={localInventories}
      />

      <div className="container mx-auto mt-5 gap-10 border-[#F4F4F4] whitespace-nowrap overflow-x-auto shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl !p-5 flex">
        <div className="mr-3">
          <a href="#review">نقد و بررسی محصول</a>
        </div>
        <div>
          <a href="#attributes">مشخصات محصول</a>
        </div>
        {/* <div>نظرات</div> */}
      </div>

      <div
        id="review"
        className="container mx-auto mt-5 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl !p-8 w-auto"
      >
        <div className="flex gap-7">
          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>
      </div>

      <div
        id="attributes"
        className="container mx-auto mt-8 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl !p-8"
      >
        <div>مشخصات کامل محصول</div>
        <div className="mt-8 text-sm">
          {product.productAttributeValues.map((value, key) => {
            return (
              <div
                className="flex justify-between pt-3 pb-3 border-b"
                key={key}
              >
                <div className="text-green-500">{value.attribute.name}</div>
                <div className="mr-10 text-slate-600">{value.val}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <Comments /> */}
      <div className="relative container mx-auto mt-8 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl !p-8">
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
              data={value}
              type="main"
              className="w-full sm:w-1/2 lg:w-1/3"
            />
          ))}
        </Slider>
      </div>
    </>
  );
}
