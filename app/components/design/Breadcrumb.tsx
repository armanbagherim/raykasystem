"use client";

import React from "react";
import { ChevronLeft, HomeIcon } from "./Icons";
import Link from "next/link";

const Breadcrumb = ({ product }) => {
  return (
    <div className="container text-center items-center mx-auto mb-6">
      <div className="w-full py-5 px-4 bg-customGray rounded-[25px] flex items-center overflow-x-auto">
        <div className="text-right whitespace-nowrap text-black-70 font-Peyda font-medium mx-2">
          شما اینجا هستید:
        </div>
        <HomeIcon />
        <Link href="/">
          <div className="whitespace-nowrap text-right text-black-70 font-Peyda font-medium mx-2">
            فروشگاه جهیزان
          </div>
        </Link>
        <ChevronLeft />
        <Link href={`/category/${product.entityType.slug}`}>
          <div className="whitespace-nowrap text-right text-green-500 text-black-70 font mx-2 font-medium">
            {product.entityType.name}
          </div>
        </Link>

        <ChevronLeft></ChevronLeft>
        <div className="whitespace-nowrap text-right text-black-70 font-Peyda font-medium mx-2">
          {product.title}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
