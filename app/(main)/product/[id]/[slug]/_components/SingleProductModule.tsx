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

import ProductCard from "@/app/components/design/Cards/ProductCard/ProductCard";
import Slider from "@/app/components/design/Slider";

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

export default function SingleProductModule({ product, related, cook }) {
  const [localInventories, setLocalInventories] = useState(product.inventories);
  // const qty = useAppSelector((state) =>
  //   productQtyInCartSelector(state, inventory.id)
  // );
  const dispatch = useAppDispatch();

  const handleVariantChange = (colorId: number) => {
    const filtered = product.inventories.filter(
      (inventory) => inventory.colorId === colorId
    );

    setLocalInventories([...filtered]); // Ensure immutability
  };

  useEffect(() => {}, [localInventories]);

  useEffect(() => {
    setLocalInventories([product.inventories[0] || ""]); // Ensure immutability
  }, [product.inventories]);

  const addToCart = (inventoryId) => {
    const id = toast.loading("در حال افزودن");
    //do something else
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks`,
        {
          method: "POST",
          headers: {
            "x-session-id": cook.value,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inventoryId: +inventoryId,
            qty: 1,
          }),
        }
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
  return (
    <>
      <Breadcrumb product={product} />
      <div className="container justify-center mx-auto mt-3 grid grid-cols-12 gap-8 p-8 lg:p-0">
        <div className="col-span-12 lg:col-span-4 border-0 rounded-lg relative">
          <div className="w-10 h-32 absolute opacity-0 lg:opacity-100 r-0 t-0 mt-4 mr-3 rounded-3xl bg-customGray z-20">
            <div className="pt-3.5 mr-3">
              <Link href="#">
                <Zoomin />
              </Link>
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
          <div className="p-3  pt-0 mr-0 pb-6">
            {product?.attachments.length ? (
              <Slider slidesPerView={1}>
                {product?.attachments.map((value, key) => (
                  <Image
                    key={key}
                    className="w-full"
                    height={"500"}
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
          <div className="text-right font-normal text-2xl text-slate-500">
            {product.title}
          </div>
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

      <div className="container mx-auto mt-5 gap-10 border-[#F4F4F4] whitespace-nowrap overflow-x-auto shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-5 flex">
        <div className="mr-3 text-green-700">نقد و بررسی محصول</div>
        <div>مشخصات محصول</div>
        <div>نظرات</div>
      </div>

      <div className="container mx-auto mt-5 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-8 w-auto">
        <div className="flex gap-7">
          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>
      </div>

      <div className="container mx-auto mt-8 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-8">
        <div>مشخصات کامل محصول</div>
        <div className="mt-8 text-sm">
          {product.productAttributeValues.map((value, key) => {
            return (
              <div className="flex gap-48 pt-3 pb-3 border-b" key={key}>
                <div className="text-green-500 w-28">
                  {value.attribute.name}
                </div>
                <div className="mr-10 text-slate-600">{value.val}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <Comments /> */}
      <div className="relative container mx-auto mt-8 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-8">
        <div className="flex pb-5 relative">
          <div className="absolute">
            <Backtitle />
          </div>
          <div className="font-bold text-2xl items-center p-3 text-primary">
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
