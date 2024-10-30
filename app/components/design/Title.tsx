import React from "react";

export default function Title({ text, color }) {
  return (
    <div className="relative">
      <svg
        className="absolute right-0 -top-1 w-[45px] md:w-auto"
        width="56"
        height="35"
        viewBox="0 0 72 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M71.4372 34.1166C70.619 42.8888 67.597 51.2874 61.2871 57.4115C55.0827 63.4332 46.6819 65.7634 38.0822 66.4895C28.4553 67.3023 17.9872 67.9583 10.6155 61.6898C2.8305 55.0699 0.193701 44.357 0.0115342 34.1166C-0.17434 23.6675 1.8367 12.4847 9.61665 5.54065C17.1189 -1.15554 28.0438 0.0531701 38.0822 0.136413C47.9937 0.218602 59.1244 -1.07853 66.0814 6.00888C73.0148 13.0723 72.358 24.2432 71.4372 34.1166Z"
          fill="#20AC73"
          fillOpacity="0.1"
        />
      </svg>
      <h4 className={`text-md md:text-xl pr-4 font-black text-${color} peyda`}>
        {text}
      </h4>
    </div>
  );
}
