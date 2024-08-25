"use client";
import React, { Key, ReactNode } from "react";
import { Swiper, SwiperSlide, SwiperOptions } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, FreeMode, Pagination } from "swiper/modules";
import SwiperNavigations from "./SwiperNavigation";

interface SliderProps {
  children: ReactNode[];
  slideProps?: Partial<SwiperSlideProps>; // Optional slide props
  slidesPerView?: number; // New prop for slides per view
}

export default function SelectedProductsSlider({
  children,
  slideProps,
  slidesPerView, // Default to 4 if not provided
}: SliderProps) {
  const swiperOptions: SwiperOptions = {
    spaceBetween: 25,
    navigation: false,
    pagination: true,
    freeMode: true,
    observer: true,
    pagination: {
      dynamicBullets: true,
    },
    autoplay: {
      delay: 2000,
    },

    breakpoints: {
      320: {
        slidesPerView: 5.5,
        spaceBetween: 20,
      },
      // Mobile
      640: {
        slidesPerView: 6.5,
        spaceBetween: 20,
      },
      // Tablet
      769: {
        slidesPerView: 7.2,
        spaceBetween: 10,
      },
      // Medium (md)
      1024: {
        slidesPerView: 8.2,
        spaceBetween: 10,
      },
      // Large (lg)
      1280: {
        slidesPerView: 9.2,
        spaceBetween: 10,
      },
      // Extra-large (xl) and 2xl
      1536: {
        slidesPerView: 15,
        spaceBetween: 20.5,
      },
    },
  };

  return (
    <Swiper
      className="container mx-auto relative mb-8"
      {...swiperOptions}
      modules={[EffectFade, Navigation, FreeMode, Pagination]}
    >
      {children.map((child: ReactNode, index: Key) => (
        <SwiperSlide key={index} {...slideProps}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
