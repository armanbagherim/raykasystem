"use client";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

function renderer({ days, hours, minutes, seconds, completed }) {
  if (completed) {
    // You can render a completed state
    return null;
  } else {
    // Display the countdown timer
    return (
      <div>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
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
