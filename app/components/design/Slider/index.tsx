"use client";
import React, { Key, ReactNode } from "react";
import { Swiper, SwiperSlide, SwiperOptions } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import { EffectFade, Navigation, FreeMode } from "swiper/modules";
import SwiperNavigations from "./SwiperNavigation";

interface SliderProps {
  children: ReactNode[];
  slideProps?: Partial<SwiperSlideProps>; // Optional slide props
  slidesPerView?: number; // New prop for slides per view
}

export default function Slider({
  children,
  slideProps,
  slidesPerView, // Default to 4 if not provided
}: SliderProps) {
  const swiperOptions: SwiperOptions = {
    spaceBetween: 25,
    navigation: true,
    freeMode: {
      enabled: slidesPerView === 1 ? false : true,
      sticky: false,
    },

    breakpoints: {
      320: {
        slidesPerView: slidesPerView ? slidesPerView : 1.5,
        spaceBetween: 10,
      },
      // Mobile
      640: {
        slidesPerView: slidesPerView ? slidesPerView : 2.5,
        spaceBetween: 10,
      },
      // Tablet
      768: {
        slidesPerView: slidesPerView ? slidesPerView : 3.5,
        spaceBetween: 10,
      },
      // Medium (md)
      1024: {
        slidesPerView: slidesPerView ? slidesPerView : 4,
        spaceBetween: 10,
      },
      // Large (lg)
      1280: {
        slidesPerView: slidesPerView ? slidesPerView : 4.5,
        spaceBetween: 10,
      },
      // Extra-large (xl) and 2xl
      1536: {
        slidesPerView: slidesPerView ? slidesPerView : 5,
        spaceBetween: 20,
      },
    },
  };

  return (
    <Swiper
      className="container mx-auto relative mb-20"
      {...swiperOptions}
      modules={[EffectFade, Navigation, FreeMode]}
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
