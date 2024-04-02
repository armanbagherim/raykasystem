"use client";
import { SmallAddToCart } from "@/app/components/design/Cards/ProductCard/Button/SmallAddToCart";
import React, { useEffect } from "react";
import Price from "./Price";
import { Cart } from "@/app/components/design/Icons";

export default function Inventories({ product, addToCart }) {
  return (
    <div className="container mx-auto mt-10  gap-10 bg-customGray rounded-3xl p-5">
      {product.length >= 1 ? (
        <>
          <h4 className="font-bold  mb-4">فروشندگان این کالا</h4>
          {product.map((value, key) => {
            return (
              <div key={key} className="mb-5 text-xl">
                <div className="bg-white flex rounded-xl p-2 px-6 gap-14 items-center justify-between ">
                  <div className="text-sm">
                    {value.guarantee.name} {value.guaranteeMonth.name}
                  </div>
                  <div className="flex gap-4 items-center">
                    {value.inventoryStatus.id === 1 ? (
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

                  <div className="flex gap-10 text-center mx-auto ml-1">
                    <div className="items-center my-auto">
                      <Price data={value} />
                    </div>
                    <div>
                      <button
                        onClick={(e) => {
                          addToCart(value.id);
                        }}
                        className="bg-primary text-slate-100 p-3 text-sm rounded-2xl items-center my-auto"
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
