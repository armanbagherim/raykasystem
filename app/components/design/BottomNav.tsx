import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import { CartBottom, Home, Menu, Pofile } from "./Icons";

export default async function BottomNav() {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed z-50 bottom-0 left-0 right-0 bg-[#FAFAFA] w-full h-20 px-8 block md:hidden lg:hidden xl:hidden">
      <div className="flex items-center justify-between h-full">
        <div className="flex flex-col text-center items-center">
          <Home />
          <span className="text-xs mt-2">صفحه اصلی</span>
        </div>
        <div className="flex flex-col text-center items-center">
          <Menu />
          <span className="text-xs mt-2">منو</span>
        </div>
        <div className="flex flex-col text-center items-center">
          <CartBottom />
          <span className="text-xs mt-2">سبد خرید</span>
        </div>
        <div className="flex flex-col text-center items-center">
          <Pofile />
          <span className="text-xs mt-2">پروفایل</span>
        </div>
      </div>
    </div>
  );
}
