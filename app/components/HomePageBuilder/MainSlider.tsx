import Link from "next/link";
import React from "react";
import Slider from "@/app/components/design/Slider";
import Image from "next/image";

interface ISlider {
  data: [];
}

export default function MainSlider({ data }) {
  return (
    <div className="mb-8 md:mb-8 mainSlide">
      <Slider slidesPerView={1}>
        {data.map((slider, index) => {
          return (
            <Link key={index} href={slider.link}>
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={slider.mobileImageUrl}
                />
                {console.log(slider.imageUrl)}
                <Image
                  src={slider.imageUrl}
                  alt={slider.alt}
                  width={500}
                  height={300}
                  quality={100}
                  priority={true}
                  layout="responsive"
                  className="md:rounded-3xl"
                />
              </picture>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}
