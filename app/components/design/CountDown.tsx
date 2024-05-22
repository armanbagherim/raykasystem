"use client";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

function renderer({ hours, minutes, seconds, days, completed }) {
  if (completed) {
    // You can render a completed state
    return null;
  } else {
    // Pad the single digit numbers with a leading zero
    const formattedDays = String(days).padStart(2, "0");
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    // Display the countdown timer with leading zeros
    return (
      <div className="flex flex-col  gap-2 text-center left-4 top-4 bg-[#006A93] p-2 rounded-2xl absolute ">
        <div className="flex flex-col">
          <span className="bg-[#F5F5F5] w-7 h-7 text-xs font-bold flex items-center justify-center text-center mb-2 rounded-xl">
            {formattedHours}
          </span>
          <span className="text-xs text-white">ساعت</span>
        </div>
        <div className="flex flex-col">
          <span className="bg-[#F5F5F5] w-7 h-7 text-xs font-bold flex items-center justify-center text-center mb-2 rounded-xl">
            {formattedMinutes}
          </span>
          <span className="text-xs text-white">دقیقه</span>
        </div>
        <div className="flex flex-col">
          <span className="bg-[#F5F5F5] w-7 h-7 text-xs font-bold flex items-center justify-center text-center mb-2 rounded-xl">
            {formattedSeconds}
          </span>
          <span className="text-xs text-white">ثانیه</span>
        </div>
      </div>
    );
  }
}

export default function CountDown({ dates }) {
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(new Date(dates));
  }, []);

  return <div>{date && <Countdown date={date} renderer={renderer} />}</div>;
}
