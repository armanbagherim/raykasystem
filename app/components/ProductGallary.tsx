import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductGallary({ children }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-4 flex items-center">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={false}
            spaceBetween={0}
            slidesPerView={4}
            freeMode={false}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="SwiperThumbs dial"
          >
            {children.map((child: ReactNode, index: Key) => (
              <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-span-8 -order-1 sm:order-4 mb-8">
          <Swiper
            loop={true}
            spaceBetween={0}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {children.map((child: ReactNode, index: Key) => (
              <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
