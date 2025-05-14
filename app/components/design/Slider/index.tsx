"use client";
import React, { Key, ReactNode, useState, useEffect } from "react";
import { Swiper, SwiperSlide, SwiperSlideProps } from "swiper/react";

import type { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import { EffectFade, Navigation, FreeMode, Autoplay } from "swiper/modules";
import SwiperNavigations from "./SwiperNavigation";
import { CircularProgress, LinearProgress, Skeleton } from "@mui/material";

interface SliderProps {
  children: ReactNode[];
  slideProps?: Partial<SwiperSlideProps>; // Optional slide props
  slidesPerView?: number; // New prop for slides per view
  isFree?: boolean;
  hasSpace?: boolean;
}

export default function Slider({
  children,
  slideProps,
  slidesPerView, // Default to 4 if not provided
  isFree = false,
  hasSpace = true,
}: SliderProps) {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const swiperOptions: SwiperOptions = {
    spaceBetween: hasSpace ? 25 : 0, // Adjust spaceBetween based on hasSpace prop
    navigation: true,
    loop: true,
    longSwipes: false,
    freeMode: false,
    observer: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      320: {
        slidesPerView: slidesPerView ? slidesPerView : 1.5,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: slidesPerView ? slidesPerView : 2.5,
        spaceBetween: 10,
      },
      769: {
        slidesPerView: slidesPerView ? slidesPerView : 2.2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: slidesPerView ? slidesPerView : 3.2,
        spaceBetween: 10,
      },
      1280: {
        slidesPerView: slidesPerView ? slidesPerView : 4.5,
        spaceBetween: 10,
      },
      1536: {
        slidesPerView: slidesPerView ? slidesPerView : 5,
        spaceBetween: 20,
      },
    },
    onInit: (swiper) => {
      setIsLoading(false); // Set loading to false after Swiper is initialized
    },
  };

  // Simulate a delay for loading (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after a delay
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <>
      {isLoading ? (
        // Loading placeholder
        <div className="flex justify-center items-center">
          <Skeleton
            variant="rounded"
            animation="wave"
            width={"100%"}
            height={400}
          />
        </div>
      ) : (
        // Swiper component
        <Swiper
          className={`mx-auto relative ${!hasSpace ? "" : "mb-8"}`}
          {...swiperOptions}
          modules={[EffectFade, Navigation, FreeMode, Autoplay]}
        >
          {children.map((child: ReactNode, index: Key) => (
            <SwiperSlide key={index} {...slideProps}>
              {child}
            </SwiperSlide>
          ))}
          <SwiperNavigations />
        </Swiper>
      )}
    </>
  );
}
