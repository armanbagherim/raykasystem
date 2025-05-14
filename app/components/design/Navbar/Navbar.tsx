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

const Megamenu = dynamic(
  () => import("@/app/components/design/Navbar/Megamenu"),
  {
    ssr: true,
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
  const CartCount = dynamic(() => import("../CartCount"), {
    ssr: true,
  });
  return (
    <div className="mb-4">
      {notif?.message ? (
        <div
          style={{
            background: notif.backgroundColor,
            color: notif.textColor,
          }}
          className="text-center px-4 py-4 text-sm md:text-md"
        >
          {notif?.message}
        </div>
      ) : (
        ""
      )}

      <div className="container mx-auto">
        <div className="items-center justify-between mb-2 px-6 md:px-0 flex pt-6 md:pt-0">
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
                <button className="flex border rounded-2xl px-3 py-4 ml-2 bg-primary text-white">
                  <img src="/icons/user.svg" alt="" />
                  <span className="mr-2 text-sm">
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
            <Link href="/cart">
              <button className="border rounded-2xl px-3 py-4 relative bg-white">
                <span className="w-6 h-6 rounded-lg absolute bg-primary text-white -right-2 -top-2 flex justify-center items-center">
                  <span>
                    <CartCount />
                  </span>
                </span>
                <img src="/icons/cart.svg" alt="" />
              </button>
            </Link>
          </div>
        </div>

        {/* <div className="absolute bg-slate-500 justify-between rounded rounded-3xl text-lg text-slate-500 p-4 mt-10 w-full h-10 group-hover:block">
        </div> */}
      </div>
      <div className="container mx-auto">
        <div
          id="navbar"
          className="flex justify-between items-center relative hidden sm:flex z-50 whitespace-nowrap mb-6 bg-white px-3 py-2 rounded-3xl"
        >
          <nav>
            <ul className="flex">
              <li className="flex ml-3 items-center group">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.58333 9.16675C3.575 9.16675 2.75 9.99175 2.75 11.0001C2.75 12.0084 3.575 12.8334 4.58333 12.8334C5.59167 12.8334 6.41667 12.0084 6.41667 11.0001C6.41667 9.99175 5.59167 9.16675 4.58333 9.16675Z"
                    stroke="#000"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M17.4166 9.16675C16.4083 9.16675 15.5833 9.99175 15.5833 11.0001C15.5833 12.0084 16.4083 12.8334 17.4166 12.8334C18.4249 12.8334 19.2499 12.0084 19.2499 11.0001C19.2499 9.99175 18.4249 9.16675 17.4166 9.16675Z"
                    stroke="#000"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M11.0001 9.16675C9.99175 9.16675 9.16675 9.99175 9.16675 11.0001C9.16675 12.0084 9.99175 12.8334 11.0001 12.8334C12.0084 12.8334 12.8334 12.0084 12.8334 11.0001C12.8334 9.99175 12.0084 9.16675 11.0001 9.16675Z"
                    stroke="#000"
                    strokeWidth="1.5"
                  />
                </svg>

                <span className="mx-3 text-sm">
                  <a href="#">دسته بندی ها</a>
                </span>
                <Megamenu items={entity} />
                <img src="/icons/down.svg" width={12} alt="" />
              </li>
              <li className="flex ml-3 items-center">
                <img src="/icons/news.svg" alt="" />
                <span className="mx-3 text-sm">
                  <a href="/blog">اخبار و مقالات</a>
                </span>
              </li>
              {/* <li className="flex ml-3 items-center">
                <img src="/icons/pack.svg" alt="" />
                <span className="mx-3 text-sm">پک های هدیه</span>
              </li> */}
              <li className="flex ml-3 items-center">
                <Link className="flex" href={"/brands"}>
                  <img src="/icons/brands.svg" alt="" />
                  <span className="mx-3 text-sm">برند ها</span>
                </Link>
              </li>
            </ul>
          </nav>

          <Link href={`https://seller.jahizan.com/`}>
            <button className="flex bg-white text-primary rounded-2xl py-4 text-sm px-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.01 11.22V15.71C21.01 20.2 19.22 22 14.72 22H9.33002C8.75002 22 8.21998 21.97 7.72998 21.9"
                  stroke="#5C1891"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.03998 15.52V11.22"
                  stroke="#5C1891"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.03 12C13.86 12 15.21 10.5101 15.03 8.68005L14.36 2H9.69001L9.02003 8.68005C8.84003 10.5101 10.2 12 12.03 12Z"
                  stroke="#5C1891"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.33 12C20.35 12 21.83 10.36 21.63 8.34998L21.35 5.59998C20.99 2.99998 19.99 2 17.37 2H14.32L15.02 9.01001C15.2 10.66 16.68 12 18.33 12Z"
                  stroke="#5C1891"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.66998 12C7.31998 12 8.80996 10.66 8.96996 9.01001L9.19 6.80005L9.66998 2H6.61999C3.99999 2 3.00001 2.99998 2.64001 5.59998L2.35998 8.34998C2.15998 10.36 3.64998 12 5.66998 12Z"
                  stroke="#5C1891"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 19C9 19.75 8.78998 20.4601 8.41998 21.0601C8.22998 21.3801 7.99998 21.67 7.72998 21.9C7.69998 21.94 7.67 21.97 7.63 22C6.93 22.63 6.01 23 5 23C3.78 23 2.68997 22.45 1.96997 21.59C1.94997 21.56 1.92002 21.54 1.90002 21.51C1.78002 21.37 1.67002 21.2201 1.58002 21.0601C1.21002 20.4601 1 19.75 1 19C1 17.74 1.58 16.61 2.5 15.88C2.67 15.74 2.84998 15.62 3.03998 15.52C3.61998 15.19 4.29 15 5 15C6 15 6.89998 15.36 7.59998 15.97C7.71998 16.06 7.82999 16.17 7.92999 16.28C8.58999 17 9 17.95 9 19Z"
                  stroke="#5C1891"
                  strokeWidth="1.5"
                  strokeLiterlimit="10"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.48999 18.98H3.51001"
                  stroke="#5C1891"
                  strokeWidth="1.5"
                  strokeLiterlimit="10"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 17.52V20.51"
                  stroke="#5C1891"
                  strokeWidth="1.5"
                  strokeLiterlimit="10"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span className="mr-2 font-bold">فروشنده شوید</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
