"use client";

import React from "react";
import HomeIcon from "./Icons/HomeIcon";
import ChevronLeft from "./Icons/ChevronLeft";

const Breadcrumb = () => {
  return (
    <div className="container text-center items-center mx-auto">
      <div className="w-full h-12 bg-slate-200 rounded-lg flex">
        <div className="text-right text-black-70 font-Peyda font-medium leading-44.6 p-3 mr-3">
          شما اینجا هستید:
        </div>
        <HomeIcon></HomeIcon>
        <div className="text-right text-black-70 font-Peyda font-medium leading-44.6 p-3">
          فروشگاه جهیزان
        </div>
        <ChevronLeft></ChevronLeft>
        <div className="text-right text-green-500 text-black-70 font-Peyda font-medium leading-44.6 p-3">
          لوازم آشپزخانه
        </div>
        <ChevronLeft></ChevronLeft>
        <div className="text-right text-green-500 text-black-70 font-Peyda font-medium leading-44.6 p-3">
          لوازم برقی
        </div>
        <ChevronLeft></ChevronLeft>
        <div className="text-right text-black-70 font-Peyda font-medium leading-44.6 p-3">
          اتو بخار فیلیپس مدل 7040 (2800 وات)
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
