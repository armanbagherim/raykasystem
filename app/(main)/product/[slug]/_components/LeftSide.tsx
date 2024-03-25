import { BigAddToCart } from "@/app/components/design/Cards/ProductCard/Button/BigAddToCart";
import {
  Espesial,
  Exclamation,
  Exclamationitalic,
  Lineonnum,
  Tickstar,
  Trucktick,
} from "@/app/components/design/Icons";
import React from "react";

export default function LeftSide({ product }) {
  return (
    <div className="col-span-3  rounded-3xl bg-customGray">
      <div className="px-4 pt-0 mr-0">
        <div className="flex justify-end ml-0 mx-auto">
          <Espesial />
        </div>
        <div className="text-primary">
          چرا از {product[0].vendor.name} خرید کنم؟
        </div>
        <div className="mt-5">
          <div className="flex gap-1 mb-4">
            <div>
              <Tickstar />
            </div>
            <div>
              <span className="font-bold text-primary">
                {product[0].guarantee.name} {product[0].guaranteeMonth.name}
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
              ارسال تا <span className="font-bold text-primary">3</span> روز
              آینده
            </div>
            <div className="my-auto justify-start mx-auto ml-4">
              <Exclamation />
            </div>
          </div>
        </div>
        <div className="mt-20 flex items-end">
          <div className="pb-0.5">
            فروشنده:{" "}
            <span className="font-bold text-primary">
              {product[0].vendor.name}
            </span>
          </div>
          <div
            className="font-bold justify-start mx-auto ml-2 items-end my-auto"
            dir="ltr"
          >
            <div className="text-center bg-[#E2F0EB] text-primary text-xs rounded-ss-xl rounded-e-xl py-2 px-3 mb-1">
              قیمت نقدی
            </div>
            <div dir="rtl">
              {Number(product[0].secondaryPrice.price).toLocaleString()} تومان
            </div>
          </div>
        </div>

        <div className="mt-9 flex gap-3 mb-4">
          <div>
            <div className="bg-primary text-slate-100 font-bold text-xl p-1 w-9 rounded-lg text-center items-center">
              23
            </div>
            <div>ثانیه</div>
          </div>
          <div>
            <div className="bg-primary text-slate-100 font-bold text-xl p-1 w-9 rounded-lg text-center items-center">
              23
            </div>
            <div>دقیقه</div>
          </div>
          <div>
            <div className="bg-primary text-slate-100 font-bold text-xl p-1 w-9 rounded-lg text-center items-center">
              23
            </div>
            <div>ساعت</div>
          </div>
          <div
            className="font-bold justify-start mx-auto ml-2 items-end my-auto"
            dir="ltr"
          >
            <div className="flex items-center my-auto gap-1">
              <div className="text-center bg-primary text-slate-100 rounded-xl p-1 w-10">
                14%
              </div>
              <div className="relative">
                <div className="absolute top-1 w-10 text-slate-950">
                  <Lineonnum />
                </div>
                <div className="text-slate-400 text-sm">155000</div>
              </div>
            </div>

            <div dir="rtl">
              <span>
                {Number(product[0].firstPrice.price).toLocaleString()}{" "}
              </span>{" "}
              تومان
            </div>
          </div>
        </div>
        <div className="text-center mx-auto">
          <BigAddToCart />
        </div>
      </div>
    </div>
  );
}
