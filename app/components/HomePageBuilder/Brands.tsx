import React from "react";
import Title from "../design/Title";
import Link from "next/link";
import BrandsSlider from "../design/Slider/BrandsSlider";
import Image from "next/image";

export default function Brands({ data }) {
  return (
    <div className="container mx-auto px-4 mb-8 md:mb-14 px-8">
      <div className="flex justify-between items-start">
        <Title text="محبوب‌ترین برندها" color={"primary"} />
        <Link
          className="border-b border-b-primary text-primary text-sm ml-4 md:text-lg"
          href="/brands"
        >
          همه برند ها
        </Link>
      </div>
      <BrandsSlider slidesPerView={8}>
        {data.map((brand, key) => (
          <Link
            className="w-full text-center"
            href={`/brand/${brand?.slug}`}
            key={brand.id}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/brands/image/${brand?.attachment?.fileName}`}
              width={115}
              loading="eager"
              height={115}
              className="border border-[#dbdbdb] rounded-xl p-2"
              alt={brand?.name}
            />
          </Link>
        ))}
      </BrandsSlider>
    </div>
  );
}
