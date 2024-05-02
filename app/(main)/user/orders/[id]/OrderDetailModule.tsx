"use client";
import React from "react";

export default function OrderDetailModule({ data }) {
  console.log(data);
  return (
    <section className=" relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div className="flex items-start flex-col gap-6 xl:flex-row ">
          <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
            <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
              <h2 className="font-manrope font-bold text-lg leading-10 text-black pb-6 border-b border-gray-200 ">
                خلاصه سفارش
              </h2>
              <div className="data py-6 border-b border-gray-200">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    قیمت محصولات
                  </p>
                  <p className="font-medium text-sm leading-8 text-gray-900">
                    $360.00
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    حمل و نقل
                  </p>
                  <p className="font-medium text-sm leading-8 text-gray-600">
                    $40.00
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 ">
                  <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                    کد تخفیف
                  </p>
                  <p className="font-medium text-sm leading-8 text-emerald-500">
                    اعمال شده
                  </p>
                </div>
              </div>
              <div className="total flex items-center justify-between pt-6">
                <p className="font-normal text-xl leading-8 text-black ">
                  جمع کل
                </p>
                <h5 className="font-manrope font-bold text-2xl leading-9 text-primary">
                  {Number(data?.result?.totalprice).toLocaleString()}
                </h5>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-3xl p-2 pl-4 bg-gray-50 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400">
                <div className="img-box ">
                  <img
                    src="https://pagedone.io/asset/uploads/1701167635.png"
                    alt="Denim Jacket image"
                    className="w-full rounded-3xl md:max-w-[85px]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                  <div className="">
                    <h2 className="font-medium text-xl leading-8 text-black mb-3">
                      محصول تستی
                    </h2>
                  </div>
                  <div className="flex items-center justify-end gap-8">
                    <h6 className="font-medium text-xl leading-8 text-primary">
                      $120.00
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
