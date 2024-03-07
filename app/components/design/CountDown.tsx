"use client";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

function renderer({ hours, minutes, seconds, completed }) {
  if (completed) {
    // You can render a completed state
    return null;
  } else {
    // Pad the single digit numbers with a leading zero
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    // Display the countdown timer with leading zeros
    return (
      <div className="flex flex-row-reverse">
        <div className="flex-col flex items-center mx-2">
          <span className="bg-[#F5F5F5] w-9 h-9 text-base font-bold inline-block text-center mb-2 rounded-xl p-2">
            {formattedHours}
          </span>
          <span className="text-xs">ساعت</span>
        </div>
        <div className="flex-col flex items-center mx-2">
          <span className="bg-[#F5F5F5] w-9 h-9 text-base font-bold inline-block text-center mb-2 rounded-xl p-2">
            {formattedMinutes}
          </span>
          <span className="text-xs">دقیقه</span>
        </div>
        <div className="flex-col flex items-center mx-2">
          <span className="bg-[#F5F5F5] w-9 h-9 text-base font-bold inline-block text-center mb-2 rounded-xl p-2">
            {formattedSeconds}
          </span>
          <span className="text-xs">ثانیه</span>
        </div>
      </div>
    );
  }
}

export default function CountDown() {
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(new Date("2024-02-17T15:44:05+00:00"));
  }, []);

  return <div>{date && <Countdown date={date} renderer={renderer} />}</div>;
}
