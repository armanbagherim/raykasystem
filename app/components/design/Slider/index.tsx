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
  slidesPerView = 4, // Default to  4 if not provided
}: SliderProps) {
  const swiperOptions: SwiperOptions = {
    slidesPerView, // Use the prop value here
    spaceBetween: 25,
    navigation: true,
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
