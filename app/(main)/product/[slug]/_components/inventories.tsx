"use client";
import { SmallAddToCart } from "@/app/components/design/Cards/ProductCard/Button/SmallAddToCart";
import React, { useEffect } from "react";

export default function Inventories({ product }) {
  console.log("arman ", product);

  return (
    <div className="container mx-auto mt-10  gap-10 bg-customGray rounded-3xl p-5">
      {product.length >= 1 ? (
        <>
          <h4 className="font-bold  mb-4">فروشندگان این کالا</h4>
          {product.map((value, key) => {
            return (
              <div key={key} className="mb-5 text-xl">
                <div className="bg-white flex rounded-xl p-2 px-6 gap-14 items-center justify-between">
                  <div className="text-base">
                    گارانتی {value.guaranteeMonth.name} {value.guarantee.name}
                  </div>
                  {value.onlyProvince && (
                    <div className="bg-[#E6F3FF] p-4 rounded-3xl text-sm text-[#008AFA]">
                      ارسال فقط به شهر {value.onlyProvince.name}
                    </div>
                  )}

                  <div className="flex gap-10 text-center mx-auto ml-1">
                    <div className="items-center my-auto">125000 تومان</div>
                    <div>
                      <SmallAddToCart />
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
