"use client";

import React from "react";
import { ChevronLeft, HomeIcon } from "./Icons";

const Breadcrumb = () => {
  return (
    <div className="container text-center items-center mx-auto mb-6">
      <div className="w-full py-5 px-4 bg-customGray rounded-[25px] flex items-center overflow-x-auto">
        <div className="text-right text-black-70 font-Peyda font-medium mx-2">
          شما اینجا هستید:
        </div>
        <HomeIcon />
        <div className="whitespace-nowrap text-right text-black-70 font-Peyda font-medium mx-2">
          فروشگاه جهیزان
        </div>
        <ChevronLeft />
        <div className="whitespace-nowrap text-right text-green-500 text-black-70 font mx-2 font-medium">
          لوازم آشپزخانه
        </div>
        <ChevronLeft></ChevronLeft>
        <div className="whitespace-nowrap text-right text-green-500 text-black-70 font mx-2 font-medium">
          لوازم برقی
        </div>
        <ChevronLeft></ChevronLeft>
        <div className="whitespace-nowrap text-right text-black-70 font-Peyda font-medium mx-2">
          اتو بخار فیلیپس مدل 7040 (2800 وات)
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
