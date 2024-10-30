import { BigAddToCart } from "@/app/components/design/Cards/ProductCard/Button/BigAddToCart";
import CountDown from "@/app/components/design/CountDown";
import {
  Espesial,
  Exclamation,
  Exclamationitalic,
  Lineonnum,
  SnapPaySingle,
  Tickstar,
  Trucktick,
} from "@/app/components/design/Icons";
import Link from "next/link";
import React from "react";

enum InventoryStatusEnum {
  available = 1,
  unavailable = 2,
}
export default function LeftSide({ product, status, addToCart }) {
  return (
    <div className="col-span-12 lg:col-span-3  rounded-2xl bg-white">
      <div className="px-4 py-4 mr-0 relative flex h-full flex-col justify-between text-sm">
        <div>
          <div className="text-gray-700 font-bold">
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
            </div>
            <div className="flex gap-1 mb-4">
              <div>
                <Exclamationitalic />
              </div>
              <div>
                امکان خرید در{" "}
                <span className="font-bold text-primary">4 قسط</span>
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
            </div>
            {status == InventoryStatusEnum.available ? (
              <div className="flex gap-1 mb-4 bg-[#008efa] p-2 rounded-xl items-center">
                <div>
                  <SnapPaySingle />
                </div>
                <div className="text-white">
                  خرید در ۴ قسط ماهانه{" "}
                  <div className="font-bold text-white">
                    {status == InventoryStatusEnum.available
                      ? product[0]?.firstPrice?.appliedDiscount?.newPrice
                        ? Math.round(
                            product[0].firstPrice.appliedDiscount.newPrice / 4
                          ).toLocaleString()
                        : product[0]?.firstPrice?.price
                        ? Math.round(
                            product[0].firstPrice.price / 4
                          ).toLocaleString()
                        : "0"
                      : "0"}{" "}
                    تومان
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="fixed md:static bottom-20 left-0 bg-white md:bg-transparent w-full flex justify-between px-4 md:px-0 items-center z-[15] border-t boerder-t-gray-300 md:flex-col md:justify-start md:items-start py-2 md:py-0 gap-4 md:gap-0">
          {status === 1 ? (
            <>
              <div className="w-full">
                <div className="md:mt-4 flex items-end">
                  <div className="pb-0.5 text-sm">
                    فروشنده:{" "}
                    <span className="font-bold text-primary">
                      {product[0]?.vendor?.name}
                    </span>
                  </div>
                </div>

                <div className="md:mt-9 flex gap-3 md:mb-4 justify-start md:justify-end">
                  <div
                    className="font-bold justify-start  ml-2 items-end md:my-auto"
                    dir="ltr"
                  >
                    <div className="flex items-center my-auto gap-1 flex-col">
                      {product[0]?.firstPrice?.appliedDiscount ? (
                        <>
                          <span className="mb-1 flex items-center w-full">
                            <span className="text-xs mr-2 bg-primary text-white rounded-full px-2 py-1">
                              {Number(
                                product[0]?.firstPrice?.appliedDiscount?.amount
                              ).toLocaleString()}
                              {product[0]?.firstPrice?.appliedDiscount
                                ?.actionType === 1
                                ? "%"
                                : "ءتء"}
                            </span>
                            <span className="opacity-75 text-xs line-through">
                              {Number(
                                product[0]?.firstPrice?.price
                              ).toLocaleString()}
                            </span>
                          </span>
                          <p className="text-sm md:text-lg w-full text-right md:text-left font-bold direction-rtl">
                            {Number(
                              product[0]?.firstPrice?.appliedDiscount?.newPrice
                            ).toLocaleString()}{" "}
                            ءتء
                          </p>
                        </>
                      ) : (
                        <p className="text-sm">
                          <div className="text-center hidden md:block animate-bounce bg-[#E2F0EB] text-primary text-sm rounded-ss-xl rounded-e-xl py-2 px-3 mb-1">
                            قیمت
                          </div>
                          <div className="text-sm md:text-lg w-full text-right md:text-left font-bold direction-rtl">
                            {Number(
                              product[0]?.firstPrice?.price
                            ).toLocaleString()}{" "}
                            ءتء
                          </div>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center w-full">
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
    </div>
  );
}
