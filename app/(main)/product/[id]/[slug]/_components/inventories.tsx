"use client";
import { SmallAddToCart } from "@/app/components/design/Cards/ProductCard/Button/SmallAddToCart";
import React, { useEffect } from "react";
import Price from "./Price";
import { Cart } from "@/app/components/design/Icons";
import Link from "next/link";

export default function Inventories({ product, addToCart, inventoryStatusId }) {
  console.log(product);
  return (
    <div className="container mx-auto mt-10  gap-10 bg-customGray rounded-3xl p-5">
      {product[0] !== "" ? (
        <>
          <h4 className="font-bold  mb-4">فروشندگان این کالا</h4>
          {product.map((value, key) => {
            return (
              <div key={key} className="mb-5 text-xl flex">
                <div className="bg-white flex flex-wrap md:flex-nowrap rounded-2xl p-3 px-6 gap-14 items-center justify-between w-full">
                  <div className="flex justify-between w-full">
                    <div className="text-base mb-2">
                      <p className="mb-2 font-bold text-primary">
                        فروشنده: {value?.vendor?.name || "فعالی وجود ندارد"}
                      </p>
                      <Link href={`/guarantees/${value?.guarantee?.slug}`}>
                        {value?.guarantee?.name} {value?.guaranteeMonth?.name}
                      </Link>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
                      {value.inventoryStatusId === 1 ? (
                        <div className="text-sm bg-green-100 px-3 py-2 rounded-2xl text-green-800">
                          موجود
                        </div>
                      ) : (
                        <div className="text-sm">ناموجود</div>
                      )}

                      {value.onlyProvince && (
                        <div className="bg-[#E6F3FF] p-4 rounded-3xl text-xs text-[#008AFA]">
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
                      <Price data={value} />
                    </div>
                    <div>
                      <button
                        onClick={(e) => {
                          addToCart(value.id);
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
        </>
      ) : (
        <div className="text-center text-red-700">
          این محصول فروشنده ای ندارد
        </div>
      )}
    </div>
  );
}
