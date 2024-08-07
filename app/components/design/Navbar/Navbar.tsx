import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import Search from "../../Search";
import BottomSearch from "../BottomNav/BottomSearch";
import Image from "next/image";
import { ChevronLeft } from "../Icons";
import SignOutButton from "../../SignOut";
import dynamic from "next/dynamic";

const CartCount = dynamic(() => import("../CartCount"), {
  ssr: false,
});

const Megamenu = dynamic(
  () => import("@/app/components/design/Navbar/Megamenu"),
  {
    ssr: false,
  }
);

async function getEntity() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/eav/admin/entityTypes?ignoreChilds=true&sortOrder=ASC`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

async function getNotif() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/headerNotifications`,
    {
      cache: "default",
    }
  );

  return res.json();
}

export default async function NavbarModule() {
  const { result: entity } = await getEntity();
  const { result: notif } = await getNotif();
  const session = await getServerSession(authOptions);

  return (
    <div className="mb-8">
      {notif.message ? (
        <div
          style={{
            background: notif.backgroundColor,
            color: notif.textColor,
          }}
          className="text-center px-4 py-4 text-sm md:text-md"
        >
          {notif.message}
        </div>
      ) : (
        ""
      )}

      <div className="container mx-auto">
        <div className="items-center justify-between mb-10 px-6 md:px-0 flex pt-6 md:pt-0">
          <div className="flex flex-row items-center md:items-center justify-between md:w-1/2 w-full">
            <Link href="/">
              <Image
                className="w-[130px] md:ml-10 md:my-6 h-auto md:block"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                src="/images/logo.svg"
              />
            </Link>
            <div className="relative w-auto md:w-full">
              <BottomSearch />
              <Search />
            </div>
          </div>
          <div className="flex w-1/2 justify-end hidden md:flex ">
            <div className="relative group">
              <Link href={session?.result ? "" : "/login"}>
                <button className="flex border rounded-2xl p-4 ml-4">
                  <img src="/icons/user.svg" alt="" />
                  <span className="mr-2">
                    {session?.result
                      ? `${session.result.firstname} ${session.result.lastname}`
                      : "ورود / ثبت نام"}
                  </span>
                </button>
              </Link>
              <div
                className={`bg-white border border-gray-200 -mt-2 shadow-md p-4 w-[130%] absolute z-[70] rounded-2xl hidden ${
                  session?.result ? `group-hover:block` : ""
                }  -right-8 left-0`}
              >
                <span className="mb-4 block peyda border-b border-b-gray-200 pb-4">
                  {session?.result
                    ? `${session.result.firstname} ${session.result.lastname}`
                    : ""}
                </span>
                <ul className="">
                  <li>
                    <Link
                      href="/user"
                      className="mb-2 text-sm flex justify-between"
                    >
                      <span>پروفایل کاربری</span>
                      <span>
                        <ChevronLeft />
                      </span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      href="/user/orders"
                      className="mb-2 text-sm flex justify-between"
                    >
                      {" "}
                      <span>سفارشات</span>
                      <span>
                        <ChevronLeft />
                      </span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      href="/user/transactions"
                      className="mb-2 text-sm flex justify-between"
                    >
                      {" "}
                      <span>تراکنش ها</span>
                      <span>
                        <ChevronLeft />
                      </span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      href="/user/addresses"
                      className="mb-2 text-sm flex justify-between"
                    >
                      {" "}
                      <span>آدرس ها</span>
                      <span>
                        <ChevronLeft />
                      </span>
                    </Link>
                  </li>
                  <SignOutButton />
                </ul>
              </div>
            </div>
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
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.58333 9.16675C3.575 9.16675 2.75 9.99175 2.75 11.0001C2.75 12.0084 3.575 12.8334 4.58333 12.8334C5.59167 12.8334 6.41667 12.0084 6.41667 11.0001C6.41667 9.99175 5.59167 9.16675 4.58333 9.16675Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M17.4166 9.16675C16.4083 9.16675 15.5833 9.99175 15.5833 11.0001C15.5833 12.0084 16.4083 12.8334 17.4166 12.8334C18.4249 12.8334 19.2499 12.0084 19.2499 11.0001C19.2499 9.99175 18.4249 9.16675 17.4166 9.16675Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M11.0001 9.16675C9.99175 9.16675 9.16675 9.99175 9.16675 11.0001C9.16675 12.0084 9.99175 12.8334 11.0001 12.8334C12.0084 12.8334 12.8334 12.0084 12.8334 11.0001C12.8334 9.99175 12.0084 9.16675 11.0001 9.16675Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                  />
                </svg>

                <span className="mx-3">
                  <a href="#">دسته بندی ها</a>
                </span>
                <Megamenu items={entity} />
                <img src="/icons/down.svg" width={12} alt="" />
              </li>
              <li className="flex ml-3">
                <img src="/icons/news.svg" alt="" />
                <span className="mx-3">
                  <a href="https://blog.jahizan.com">اخبار و مقالات</a>
                </span>
              </li>
              {/* <li className="flex ml-3">
                <img src="/icons/pack.svg" alt="" />
                <span className="mx-3">پک های هدیه</span>
              </li> */}
              <li className="flex ml-3">
                <Link className="flex" href={"/brands"}>
                  <img src="/icons/brands.svg" alt="" />
                  <span className="mx-3">برند ها</span>
                </Link>
              </li>
            </ul>
          </nav>

          <Link href={`/amazing`}>
            <button className="flex border bg-primary text-white rounded-2xl py-4 px-8">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z"
                  stroke="#FFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 14.75L15 8.75"
                  stroke="#FFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.9945 14.75H15.0035"
                  stroke="#FFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.99451 9.25H9.00349"
                  stroke="#FFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mr-2">تخفیفات ویژه</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
