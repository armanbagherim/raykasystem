import React from "react";
import Title from "../design/Title";
import Slider from "../design/Slider";
import ProductCard from "../design/Cards/ProductCard/ProductCard";
import Link from "next/link";

interface ICategorySlider {
  data: [];
  name: string;
  amazing?: boolean;
  totalLink: string;
}

export default function CategorySlider({
  data,
  name,
  amazing,
  totalLink,
}: ICategorySlider) {
  return (
    <div
      className={`container mx-auto ${amazing ? "" : "mb-8 md:mb-14"}  px-4`}
    >
      <div className="flex justify-between items-center mb-9 ">
        <Title text={name} color={amazing ? "white" : "primary"} />
        <Link
          className={`border-b border-b-${amazing ? "white" : "primary"} text-${
            amazing ? "white" : "primary"
          } text-sm ml-4 md:text-lg`}
          href={totalLink}
        >
          مشاهده همه
        </Link>
      </div>
      <div className="flex gap-5 px-4">
        <Slider>
          {data?.map((slide, key) => (
            <ProductCard key={key} data={slide ?? null} type="main" />
          ))}
        </Slider>
      </div>
    </div>
  );
}
