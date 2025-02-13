"use client";
import { SmallAddToCart } from "@/app/components/design/Cards/ProductCard/Button/SmallAddToCart";
import React, { useEffect } from "react";
import Price from "./Price";
import { Cart } from "@/app/components/design/Icons";
import Link from "next/link";

export default function Inventories({ product, addToCart, inventoryStatusId }) {
  return (
    product.length > 1 && (
      <div className="container mx-auto">
        <div className="  gap-10 bg-white rounded-3xl !p-5 mb-4">
          {product[0] !== "" ? (
            <>
              <div>
                <h4 className="font-bold  mb-4">فروشندگان این کالا</h4>
                {product.map((value, key) => {
                  return (
                    <div key={key} className="mb-5 text-xl flex">
                      <div className="bg-[#f6f6f6] flex flex-wrap md:flex-nowrap rounded-2xl p-3 px-6 gap-14 items-center justify-between w-full">
                        <div className="flex flex-wrap gap-4 w-full ">
                          <div className="text-base mb-2">
                            <Link
                              href={`/sellers/${value?.vendor?.slug}`}
                              className="mb-2 font-bold text-primary block"
                            >
                              فروشنده:{" "}
                              {value?.vendor?.name || "فعالی وجود ندارد"}
                            </Link>
                            <Link
                              href={`/guarantees/${value?.guarantee?.slug}`}
                            >
                              {value?.guarantee?.name}{" "}
                              {value?.guaranteeMonth?.name}
                            </Link>
                          </div>
                          <div className="flex flex-col md:flex-row gap-2 items-end md:items-center">
                            {value?.qty < 10 ? (
                              <div className="bg-[#ffe6f6] p-3 rounded-3xl text-xs text-[#fa0057]">
                                فقط{" "}
                                <span className="font-bold">{value?.qty}</span>{" "}
                                عدد باقی مانده
                              </div>
                            ) : (
                              ""
                            )}

                            {value?.onlyProvince && (
                              <div className="bg-[#E6F3FF] p-3 rounded-3xl text-xs text-[#008AFA]">
                                ارسال فقط به شهر{" "}
                                <span className="font-bold">
                                  {value.onlyProvince.name}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex text-left mx-auto justify-between md:justify-end w-full">
                          <div className="items-center my-auto">
                            <Price data={value ?? null} />
                          </div>
                          <div>
                            <button
                              onClick={(e) => {
                                addToCart(value?.id);
                              }}
                              className="bg-primary mr-4 text-slate-100 p-3 text-sm rounded-2xl items-center my-auto"
                            >
                              <div className="flex gap-3">
                                <div>
                                  <Cart />
                                </div>
                                <div className="items-center my-auto justify-start ml-0 mx-auto">
                                  <div>افزودن به سبد خرید</div>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center text-red-700">
              این محصول فروشنده ای ندارد
            </div>
          )}
        </div>
      </div>
    )
  );
}
