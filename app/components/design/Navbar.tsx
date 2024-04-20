import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import Megamenu from "@/app/(main)/components/Megamenu";
import CartCount from "./CartCount";
import Search from "../Search";
import BottomSearch from "./BottomSearch";

async function getEntity() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/eav/admin/entityTypes?ignoreChilds=true&sortOrder=ASC`,
    {
      cache: "force-cache",
    }
  );

  return res.json();
}

export default async function NavbarModule() {
  const { result: entity } = await getEntity();

  const session = await getServerSession(authOptions);

  return (
    <div className="mb-8">
      <img
        alt="Header Offer"
        className="w-full h-auto mb-8 hidden md:block"
        src={"/images/header.png"}
      />
      <div className="container mx-auto">
        <div className="items-center justify-between mb-10 px-6 md:px-0 flex pt-6 md:pt-0">
          <div className="flex flex-row items-center md:items-center justify-between w-full md:w-1/2 W-full">
            <Link href="/">
              <img
                className="h-full md:ml-10 md:my-6 md:my-0"
                src="/images/logo.png"
                alt=""
              />
            </Link>
            <div className="relative w-auto md:w-full">
              <BottomSearch />
              <Search />
            </div>
          </div>
          <div className="flex w-1/2 justify-end hidden md:flex">
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
            <a href="/cart">
              <button className="border rounded-2xl p-4 relative">
                <span className="w-6 h-6 rounded-lg absolute bg-primary text-white -right-2 -top-2 flex justify-center items-center">
                  <span>
                    <CartCount />
                  </span>
                </span>
                <img src="/icons/cart.svg" alt="" />
              </button>
            </a>
          </div>
        </div>

        {/* <div className="absolute bg-slate-500 justify-between rounded rounded-3xl text-lg text-slate-500 p-4 mt-10 w-full h-10 group-hover:block">
        </div> */}
      </div>
      <div className="container mx-auto">
        <div
          id="navbar"
          className="flex justify-between items-center relative hidden sm:flex z-50 whitespace-nowrap"
        >
          <nav>
            <ul className="flex">
              <li className="flex ml-3 group">
                <img src="/icons/menu.svg" alt="" />
                <span className="mx-3">
                  <a href="#">دسته بندی ها</a>
                </span>
                <Megamenu items={entity} />
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
                <Link className="flex" href={"/brands"}>
                  <img src="/icons/brands.svg" alt="" />
                  <span className="mx-3">برند ها</span>
                </Link>
              </li>
            </ul>
          </nav>

          <button className="flex border border-primary text-primary rounded-2xl py-4 px-8">
            <img src="/icons/discount.svg" alt="" />
            <span className="mr-2">تخفیفات ویژه</span>
          </button>
        </div>
      </div>
    </div>
  );
}
