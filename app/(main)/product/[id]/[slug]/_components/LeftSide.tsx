import { BigAddToCart } from "@/app/components/design/Cards/ProductCard/Button/BigAddToCart";
import CountDown from "@/app/components/design/CountDown";
import {
  Espesial,
  Exclamation,
  Exclamationitalic,
  Lineonnum,
  Tickstar,
  Trucktick,
} from "@/app/components/design/Icons";
import Link from "next/link";
import React from "react";

export default function LeftSide({ product, status, addToCart }) {
  return (
    <div className="col-span-12 lg:col-span-3  rounded-3xl bg-customGray">
      <div className="px-4 py-8 mr-0 relative flex h-full flex-col justify-between ">
        <div>
          <div className="text-primary">
            {product[0] ? (
              <span>چرا از {product[0]?.vendor?.name} خرید کنم؟</span>
            ) : (
              <span>محصول فروشنده ای ندارد</span>
            )}
          </div>
          <div className="mt-5">
            <div className="flex gap-1 mb-4">
              <div>
                <Tickstar />
              </div>
              <div>
                <span className="font-bold text-primary text-sm w-1/2">
                  {product[0] ? (
                    <Link href={`/guarantees/${product[0]?.guarantee?.slug}`}>
                      <span>
                        {product[0]?.guarantee?.name}{" "}
                        {product[0]?.guaranteeMonth?.name}
                      </span>
                    </Link>
                  ) : (
                    <span>بدون گارانتی فعال</span>
                  )}
                </span>
              </div>
              <div className="my-auto justify-start mx-auto ml-4">
                <Exclamation />
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              <div>
                <Exclamationitalic />
              </div>
              <div>
                امکان خرید در{" "}
                <span className="font-bold text-primary">4 قسط</span>
              </div>
              <div className="my-auto justify-start mx-auto ml-4">
                <Exclamation />
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              <div>
                <Trucktick />
              </div>
              <div>
                تحویل <span className="font-bold text-primary">1 تا 5</span> روز
                کاری
              </div>
              <div className="my-auto justify-start mx-auto ml-4">
                <Exclamation />
              </div>
            </div>
          </div>
        </div>
        {status === 1 ? (
          <>
            <div className="mt-20 flex items-end">
              <div className="pb-0.5">
                فروشنده:{" "}
                <span className="font-bold text-primary">
                  {product[0]?.vendor?.name}
                </span>
              </div>
              {/* {product[0]?.secondaryPrice?.price ? (
                <div
                  className="font-bold justify-start mx-auto ml-2 items-end my-auto"
                  dir="ltr"
                >
                  <div className="w-full text-center bg-[#E2F0EB] text-primary text-sm rounded-ss-xl rounded-e-xl py-2 px-3 mb-1">
                    قیمت نقدی
                  </div>
                  <div
                    className="text-lg w-full text-left font-bold direction-rtl"
                    dir="rtl"
                  >
                    {Number(product[0].secondaryPrice?.price).toLocaleString()}{" "}
                    تومانء
                  </div>
                </div>
              ) : (
                ""
              )} */}
            </div>

            <div className="mt-9 flex gap-3 mb-4">
              {product[0]?.firstPrice?.appliedDiscount ? (
                <CountDown
                  dates={product[0]?.firstPrice?.appliedDiscount?.endDate}
                />
              ) : (
                ""
              )}
              <div
                className="font-bold justify-start mx-auto ml-2 items-end my-auto"
                dir="ltr"
              >
                <div className="flex items-center my-auto gap-1 flex-col">
                  {product[0]?.firstPrice?.appliedDiscount ? (
                    <>
                      <div className="w-full text-center animate-bounce bg-[#E2F0EB] text-primary text-sm rounded-ss-xl rounded-e-xl py-2 px-3 mb-1">
                        قیمت اقساطی
                      </div>
                      <span className="mb-1 flex items-center w-full">
                        <span className="text-xs mr-2 bg-primary text-white rounded-full px-2 py-1">
                          {Number(
                            product[0]?.firstPrice?.appliedDiscount?.amount
                          ).toLocaleString()}
                          {product[0]?.firstPrice?.appliedDiscount
                            ?.actionType === 1
                            ? "%"
                            : "تومانء"}
                        </span>
                        <span className="opacity-75 text-xs line-through">
                          {Number(
                            product[0]?.firstPrice?.price
                          ).toLocaleString()}
                        </span>
                      </span>
                      <p className="text-lg w-full text-left font-bold direction-rtl">
                        {Number(
                          product[0]?.firstPrice?.appliedDiscount?.newPrice
                        ).toLocaleString()}{" "}
                        تومانء
                      </p>
                    </>
                  ) : (
                    <p className="text-sm">
                      <div className="text-center animate-bounce bg-[#E2F0EB] text-primary text-sm rounded-ss-xl rounded-e-xl py-2 px-3 mb-1">
                        قیمت اقساطی
                      </div>
                      <div className="text-lg w-full text-left font-bold direction-rtl">
                        {Number(product[0]?.firstPrice?.price).toLocaleString()}{" "}
                        تومانء
                      </div>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center">
              <BigAddToCart
                handleClick={(e) => {
                  addToCart(product[0]?.id);
                }}
                status={true}
              />
            </div>
          </>
        ) : (
          <BigAddToCart status={false} />
        )}
      </div>
    </div>
  );
}
