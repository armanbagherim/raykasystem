"use client";
import React, { useEffect, useState } from "react";

const Megamenu = () => {
  return (
    <>
      <div
        onMouseEnter={(e) => e.stopPropagation()}
        className={`absolute z-40 top-10 bg-customGray rounded rounded-3xl text-md w-full hidden group-hover:lg:block group-hover:md:block group-hover:xl:block group-hover:2xl:block`}
      >
        <div
          className="grid grid-cols-5 p-2"
          onMouseEnter={(e) => e.stopPropagation()}
        >
          <div className="col-span-1 p-4 pb-0 text-slate-500">
            <p className="p-4 border-l hover:border-l-primary hover:border-l-4 hover:text-black">
              آشپزخانه
            </p>
            <p className="p-4 border-t border-l hover:border-l-primary hover:border-l-4 hover:text-black">
              سرو و پذیرایی
            </p>
            <p className="p-4 border-t border-l hover:border-l-primary hover:border-l-4 hover:text-black">
              لوازم برقی
            </p>
            <p className="p-4 border-t border-l hover:border-l-primary hover:border-l-4 hover:text-black">
              لوازم خانه
            </p>
            <p className="p-4 border-t border-l hover:border-l-primary hover:border-l-4 hover:text-black">
              لوازم دکوری
            </p>
            <p className="p-4 border-t border-l hover:border-l-primary hover:border-l-4 hover:text-black">
              محصولات استوک
            </p>
            <p className="p-4 border-t border-l hover:border-l-primary hover:border-l-4 hover:text-black">
              تخفیفات ویژه
            </p>
            <p className="p-4 border-t border-l hover:border-l-primary hover:border-l-4 hover:text-black">
              سه شنبه های تخفیفی
            </p>
            <p className="p-4 border-t border-l hover:border-l-primary hover:border-l-4 hover:text-black">
              مقالات
            </p>
          </div>
          <div
            className="col-span-2 p-2 pb-0"
            onMouseEnter={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b text-primary">
              همه لوازم برقی آشپزخانه
            </div>
            <div className="grid grid-cols-2 text-slate-700">
              <div className="col-span-1">
                <p className="p-4 hover:text-black text-primary">
                  وسایل آشپزخانه
                </p>
                <p className="p-4 hover:text-black">کلمن و فلاسک</p>
                <p className="p-4">جاادویه و پاسماوری</p>
                <p className="p-4 hover:text-black">
                  ترازو , کفگیرملاقه و ابزار
                </p>
                <p className="p-4 hover:text-black">آبکش و لگن</p>
                <p className="p-4 hover:text-black">سماور</p>
                <p className="p-4 hover:text-black">کتری و قوری</p>
                <p className="p-4 pb-0 hover:text-black">جا ظرفی و آب چکان</p>
              </div>
              <div className="col-span-1">
                <p className="p-4 hover:text-black text-primary">
                  وسایل آشپزخانه
                </p>
                <p className="p-4 hover:text-black">کلمن و فلاسک</p>
                <p className="p-4 hover:text-black">جاادویه و پاسماوری</p>
                <p className="p-4 hover:text-black">
                  ترازو , کفگیرملاقه و ابزار
                </p>
                <p className="p-4 hover:text-black">آبکش و لگن</p>
                <p className="p-4 hover:text-black">سماور</p>
                <p className="p-4 hover:text-black">کتری و قوری</p>
                <p className="p-4 pb-0 hover:text-black">جا ظرفی و آب چکان</p>
              </div>
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1 p-2 pb-0 items-center my-auto rounded rounded-3xl">
            <img src="/images/ghahvesaz.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Megamenu;
