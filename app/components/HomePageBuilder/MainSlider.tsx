import Link from "next/link";
import React from "react";
import Slider from "@/app/components/design/Slider";
import Image from "next/image";

interface ISlider {
  data: [];
}

export default function MainSlider({ data }) {
  return (
    <div className="mb-8 md:mb-20">
      <Slider slidesPerView={1}>
        {data.map((slider, index) => {
          return (
            <Link key={index} href={slider.link}>
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={slider.mobileImageUrl}
                />
                <Image
                  src={slider.imageUrl}
                  alt={slider.alt}
                  width={500}
                  height={300}
                  quality={100}
                  layout="responsive"
                  className=""
                />
              </picture>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}
