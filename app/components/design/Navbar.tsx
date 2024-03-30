import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import Megamenu from "@/app/(main)/components/Megamenu";

export default async function NavbarModule() {
  const session = await getServerSession(authOptions);

  return (
    <div className="mb-8">
      <img
        alt="Header Offer"
        className="w-full h-auto mb-8"
        src={"/images/header.png"}
      />
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center w-1/2">
            <Link href="/">
              <img className="h-full ml-10" src="/images/logo.png" alt="" />
            </Link>
            <div className="relative w-full">
              <img
                className="absolute right-3 top-4"
                src="/icons/search.svg"
                alt=""
              />
              <input
                placeholder="جستجو کنید"
                type="text"
                className="border rounded-2xl p-4 pr-12 outline-none w-full bg-[#FBFBFB]"
              />
            </div>
          </div>
          <div className="flex w-1/2 justify-end">
            <Link href={session?.result ? "/user" : "/login"}>
              <button className="flex border rounded-2xl p-4 ml-4">
                <img src="/icons/user.svg" alt="" />
                <span className="mr-2">
                  {session?.result
                    ? `${session.result.firstname} ${session.result.lastname}`
                    : "ورود / ثبت نام"}
                </span>
              </button>
            </Link>
            <button className="border rounded-2xl p-4">
              <img src="/icons/cart.svg" alt="" />
            </button>
          </div>
        </div>
        <div id="navbar" className="flex justify-between items-center relative hidden sm:flex">
            <nav>
              <ul className="flex">
                <li className="flex ml-3 group">
                  <img src="/icons/menu.svg" alt="" />
                  <span className="mx-3">
                    <a href="#">دسته بندی ها</a>
                  </span>
                  <Megamenu />
                  <img src="/icons/down.svg" width={12} alt="" />
                </li>
                <li className="flex ml-3">
                  <img src="/icons/news.svg" alt="" />
                  <span className="mx-3">
                    <a href="#">اخبار و مقالات</a>
                  </span>
                </li>
                <li className="flex ml-3">
                  <img src="/icons/pack.svg" alt="" />
                  <span className="mx-3">پک های هدیه</span>
                </li>
                <li className="flex ml-3">
                  <img src="/icons/brands.svg" alt="" />
                  <span className="mx-3">برند ها</span>
                </li>
              </ul>
            </nav>

            <button className="flex border border-primary text-primary rounded-2xl py-4 px-8">
              <img src="/icons/discount.svg" alt="" />
              <span className="mr-2">تخفیفات ویژه</span>
            </button>
          </div>


        {/* <div className="absolute bg-slate-500 justify-between rounded rounded-3xl text-lg text-slate-500 p-4 mt-10 w-full h-10 group-hover:block">
        </div> */}
      </div>
    </div>
  );
}
