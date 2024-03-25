"use client";

import {
  Addsquare,
  Minussquare,
  Searchicon,
  Sorticon,
} from "@/app/components/design/Icons";
import { useState } from "react";

const Sidebar = () => {
  const [IsBrandOpen, SetIsBrandOpen] = useState(false);
  const brandFiltersShow = () => {
    SetIsBrandOpen(!IsBrandOpen);
  };

  const [IsPriceOpen, SetIsPriceOpen] = useState(false);
  const priceFiltersShow = () => {
    SetIsPriceOpen(!IsPriceOpen);
  };

  const [IsColorOpen, SetIsColorOpen] = useState(false);
  const colorFiltersShow = () => {
    SetIsColorOpen(!IsColorOpen);
  };

  const [IsGeneralFiltersOpen, SetIsGeneralFilterOpen] = useState(false);
  const generalFiltersShow = () => {
    SetIsGeneralFilterOpen(!IsGeneralFiltersOpen);
  };

  return (
    <>
      <div className="col-span-3 p-4">
        <div>
          {/* برند */}
          <div className="bg-customGray p-4 rounded-2xl grid grid-cols-2">
            <span className="col-span-1 text-md font-bold">برندها</span>
            <span className="col-span-1 flex justify-end">
              <button onClick={brandFiltersShow}>
                {IsBrandOpen ? <Minussquare /> : <Addsquare />}
              </button>
            </span>
          </div>
          {IsBrandOpen && (
            <div className="pl-5 overflow-y-scroll max-h-52 mt-5 ml-4 font-normal text-md">
              <div className="p-4 grid grid-cols-2">
                <span className="col-span-1">نسپرسو</span>
                <span className="col-span-1 flex justify-end">
                  <input type="radio" />
                </span>
              </div>
              <div className="p-4 grid grid-cols-2">
                <span className="col-span-1">برند تست</span>
                <span className="col-span-1 flex justify-end">
                  <input type="radio" />
                </span>
              </div>
              <div className="p-4 grid grid-cols-2">
                <span className="col-span-1">برند تست2</span>
                <span className="col-span-1 flex justify-end">
                  <input type="radio" />
                </span>
              </div>
              <div className="p-4 grid grid-cols-2">
                <span className="col-span-1">برندتست3</span>
                <span className="col-span-1 flex justify-end">
                  <input type="radio" />
                </span>
              </div>
              <div className="p-4 grid grid-cols-2">
                <span className="col-span-1">برند تست4</span>
                <span className="col-span-1 flex justify-end">
                  <input type="radio" />
                </span>
              </div>
            </div>
          )}
        </div>

        <div>
          {/* قیمت */}
          <div className="bg-customGray p-4 mt-5 rounded-2xl grid grid-cols-2">
            <span className="col-span-1 text-md font-bold">قیمت</span>
            <span className="col-span-1 flex justify-end">
              <button onClick={priceFiltersShow}>
                {IsPriceOpen ? <Minussquare /> : <Addsquare />}
              </button>
            </span>
          </div>
          {IsPriceOpen && (
            <div className="mt-4 pr-4 pl-4">
              <form action="#">
                <div className="grid grid-cols-2 text-sm gap-1">
                  <div className="flex gap-1 justify-start">
                    <span className="text-slate-500">از</span>
                    <span className="text-primary">
                      {Number(2550000).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-1 justify-end">
                    <span className="text-slate-500">تا</span>
                    <span className="text-primary">
                      {Number(2580000).toLocaleString()}
                    </span>
                  </div>
                </div>
                <input id="range"
                  dir="ltr"
                  className="w-full"
                  type="range"
                  min="2550000"
                  max="2850000"
                />
                <div className="grid grid-cols-2 text-xs text-slate-500">
                  <div className="flex justify-start">ارزان ترین</div>
                  <div className="flex justify-end">گران ترین</div>
                </div>
              </form>
            </div>
          )}
        </div>

        <div>
          {" "}
          {/* توان مضرفی */}
          <div className="bg-customGray p-4 mt-5 rounded-2xl grid grid-cols-2">
            <span className="col-span-1 text-md font-bold">توان مصرفی</span>
            <span className="col-span-1 flex justify-end">
              <button>
                <Addsquare />
              </button>
            </span>
          </div>
        </div>

        <div>
          {/* رنگ */}
          <div className="mt-5">
            <div className="bg-customGray p-4  grid grid-cols-2 rounded-2xl">
              <span className="col-span-1 text-md font-bold">رنگ</span>
              <span className="col-span-1 flex justify-end">
                <button onClick={colorFiltersShow}>
                  {IsColorOpen ? <Minussquare /> : <Addsquare />}
                </button>
              </span>
            </div>
            {IsColorOpen && (
              <>
                <div className="p-4">
                  <div className="bg-customGray p-2 rounded-2xl flex gap-1">
                    <div className="items-center my-auto">
                      <Searchicon />
                    </div>
                    <div>
                      <input
                        className="items-center my-auto border-none focus:outline-none bg-transparent text-gray-700 px-3 py-2 placeholder-gray-500"
                        type="text"
                        placeholder="جستجو"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 pr-5 mt-3 font-normal text-md">
                  <div className="col-span-3 flex gap-2 items-center my-auto">
                    <span className="w-7 h-7 bg-purple-600 rounded-lg"></span>
                    <span>lieln آمریکا</span>
                  </div>
                  <div className="col-span-1 flex items-center my-auto justify-end">
                    <input className="flex justify-end mx-auto" type="radio" />
                  </div>
                </div>
                <div className="grid grid-cols-4 pr-5 mt-3">
                  <div className="col-span-3 flex gap-2 items-center my-auto">
                    <span className="w-7 h-7 bg-purple-300 rounded-lg"></span>
                    <span>گلبهی استرالیا</span>
                  </div>
                  <div className="col-span-1 flex items-center my-auto justify-end">
                    <input className="flex justify-end mx-auto" type="radio" />
                  </div>
                </div>
                <div className="grid grid-cols-4 pr-5 mt-3">
                  <div className="col-span-3 flex gap-2 items-center my-auto">
                    <span className="w-7 h-7 bg-purple-600 rounded-lg"></span>
                    <span>lieln آلمان</span>
                  </div>
                  <div className="col-span-1 flex items-center my-auto justify-end">
                    <input className="flex justify-end mx-auto" type="radio" />
                  </div>
                </div>
                <div className="grid grid-cols-4 pr-5 mt-3">
                  <div className="col-span-3 flex gap-2 items-center my-auto">
                    <span className="w-7 h-7 bg-purple-300 rounded-lg"></span>
                    <span>Calina ایران </span>
                  </div>
                  <div className="col-span-1 flex items-center my-auto justify-end">
                    <input className="flex justify-end mx-auto" type="radio" />
                  </div>
                </div>
                <div className="grid grid-cols-4 pr-5 mt-3">
                  <div className="col-span-3 flex gap-2 items-center my-auto">
                    <span className="w-7 h-7 bg-purple-600 rounded-lg"></span>
                    <span>lieln آمریکا</span>
                  </div>
                  <div className="col-span-1 flex items-center my-auto justify-end">
                    <input className="flex justify-end mx-auto" type="radio" />
                  </div>
                </div>
                <div className="grid grid-cols-4 pr-5 mt-3">
                  <div className="col-span-3 flex gap-2 items-center my-auto">
                    <span className="w-7 h-7 bg-purple-300 rounded-lg"></span>
                    <span>lieln سوئد</span>
                  </div>
                  <div className="col-span-1 flex items-center my-auto justify-end">
                    <input className="flex justify-end mx-auto" type="radio" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          {/* فیلترهای کلی */}
          <div className="bg-customGray p-4 mt-5 rounded-2xl grid grid-cols-2">
            <span className="col-span-1 text-md font-bold">فیلترهای کلی</span>
            <span className="col-span-1 flex justify-end">
              <button onClick={generalFiltersShow}>
                {IsGeneralFiltersOpen ? <Minussquare /> : <Addsquare />}
              </button>
            </span>
          </div>
          {IsGeneralFiltersOpen && (
            <>
              <div className="font-normal text-md">
                <div className="p-4 pt-0 mt-4 justify-center mx-auto">
                  <label className="grid grid-cols-3 inline-flex items-center cursor-pointer">
                    <span className="col-span-2 ms-3  text-gray-900 dark:text-gray-300">
                      فقط کالاهای موجود
                    </span>
                    <div className="col-span-1 justify-end mx-auto">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                  </label>
                </div>

                <div className="p-4 pt-0 mt-4 justify-center mx-auto">
                  <label className="grid grid-cols-3 inline-flex items-center cursor-pointer">
                    <span className="col-span-2 ms-3 text-gray-900 dark:text-gray-300">
                      آپشن تستی
                    </span>
                    <div className="col-span-1 justify-end mx-auto">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
