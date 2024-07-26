"use client";
import { useSwiper } from "swiper/react";

const SwiperNavigations = () => {
  const swiper = useSwiper();

  return (
    <div className="navigation-btns pointer-events-none flex w-full h-full justify-between items-center top-0 left-0 absolute z-20 flex-row-reverse">
      <button
        className="pointer-events-auto outline-none"
        onClick={() => swiper.slideNext()}
      >
        {" "}
        <img src="/icons/left-button.svg" alt="" />
      </button>
      <button
        className="pointer-events-auto outline-none"
        onClick={() => swiper.slidePrev()}
      >
        <img src="/icons/right-button.svg" alt="" />
      </button>
    </div>
  );
};

export default SwiperNavigations;
