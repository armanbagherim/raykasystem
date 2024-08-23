import Image from "next/image";
import Link from "next/link";
import React from "react";
import BrandsSlider from "../design/Slider/BrandsSlider";

export default function SelectedProducts({ title, data }) {
  return (
    <div className="container !px-4 md:!px-8 mx-auto mb-24">
      <h4 className="text-md md:text-3xl mb-14 font-black text-center text-primary peyda">
        {title}
      </h4>
      <BrandsSlider slidesPerView={12}>
        {data.map((category) => {
          return (
            <Link
              key={category?.id}
              href={`${process.env.WEBSITE_BASE_URL}/category/${category?.slug}`}
              className="flex flex-col justify-center items-center"
            >
              {category?.attachment ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/entitytypes/${category?.attachment?.fileName}`}
                  alt={category?.name}
                  width={150}
                  priority
                  className="!h-[60px] !w-[60px] object-contain mb-4 border border-primary p-2 rounded-full"
                  height={150}
                  loading="eager"
                  layout="responsive"
                />
              ) : (
                <img
                  width={30}
                  height={30}
                  className="!h-[150px] w-auto object-contain mb-4"
                  src="/images/no-photos.png"
                  alt=""
                />
              )}

              <span className="text-xs md:text-sm text-gray-800 font-light">
                {category?.name}
              </span>
            </Link>
          );
        })}
      </BrandsSlider>
    </div>
  );
}
