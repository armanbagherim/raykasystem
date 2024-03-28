"use client";
import React, { Key, ReactNode } from "react";
import { Swiper, SwiperSlide, SwiperOptions } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import { EffectFade, Navigation } from "swiper/modules";
import SwiperNavigations from "./SwiperNavigation";

interface SliderProps {
  children: ReactNode[];
  slideProps?: Partial<SwiperSlideProps>; // Optional slide props
  slidesPerView?: number; // New prop for slides per view
}

export default function Slider({
  children,
  slideProps,
  slidesPerView = 4, // Default to 4 if not provided
}: SliderProps) {
  const swiperOptions: SwiperOptions = {
    slidesPerView: 1, // Default to 1 for mobile
    spaceBetween: 25,
    navigation: true,
    breakpoints: {
      // Mobile
      640: {
        slidesPerView: 1,
        spaceBetween: 60,
      },
      // Tablet
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // Medium (md)
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      // Large (lg)
      1280: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
      // Extra-large (xl) and 2xl
      1536: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  };

  return (
    <Swiper
      className="container mx-auto relative mb-20"
      {...swiperOptions}
      modules={[EffectFade, Navigation]}
    >
      {children.map((child: ReactNode, index: Key) => (
        <SwiperSlide key={index} {...slideProps}>
          {child}
        </SwiperSlide>
      ))}
      <SwiperNavigations />
    </Swiper>
  );
}
