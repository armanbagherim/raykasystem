"use client";
import React, { Key } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import { EffectFade, Navigation } from "swiper/modules";
import SwiperNavigations from "./SwiperNavigation";

interface sliderProps {}
export default function Slider({ children }: { children: [] }) {
  return (
    <Swiper
      className="container mx-auto relative"
      spaceBetween={30}
      effect={"fade"}
      loop
      modules={[EffectFade]}
    >
      {children.map((value: any, key: Key) => (
        <SwiperSlide key={key}> {value}</SwiperSlide>
      ))}
      <SwiperNavigations />
    </Swiper>
  );
}
