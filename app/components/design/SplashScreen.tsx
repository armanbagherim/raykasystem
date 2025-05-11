"use client";
import React, { useState, useEffect } from "react";
import ClientLoading from "../global/ClientLoading";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 2000ms = 2 seconds
  }, []);

  if (!showSplash) {
    return null; // or return a fallback component if you want
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-white z-[999999] flex justify-center items-center md:hidden">
      <div>
        <ClientLoading />
        <h4 className="w-full text-center text-3xl font-bold text-primary">
          رایکا سیستم
        </h4>
      </div>
    </div>
  );
}
