import React from "react";
import "./../globals.scss";
import localFont from "next/font/local";
import Link from "next/link";

const IRANSansX = localFont({
  src: [
    {
      path: "./../assets/IRANSansX/IRANSansX-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./../assets/IRANSansX/IRANSansX-Light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./../assets/IRANSansX/IRANSansX-UltraLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./../assets/IRANSansX/IRANSansX-Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../assets/IRANSansX/IRANSansX-Light.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../assets/IRANSansX/IRANSansX-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./../assets/IRANSansX/IRANSansX-ExtraBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./../assets/IRANSansX/IRANSansX-Black.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});
export default function page() {
  return (
    <section
      className={`bg-white dark:bg-gray-900 ${IRANSansX.className}`}
      dir="rtl"
    >
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-primary dark:text-bprimary">
            ارور 404 خوردی که!
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            این صفحه برای همیشه رفته!
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            شرمندتیم نتونستیم صفحرو برات پیدا کنیم ! یا حذف شده یا یه داستانی
            براش پیش اومده
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link href={"/"}>
              <button className="w-1/2 px-5 py-4 text-sm tracking-wide text-white transition-colors duration-200 bg-primary rounded-2xl shrink-0 sm:w-auto hover:bg-primary dark:hover:bg-primary dark:bg-primary">
                بریم صفحه اصلی سایت
              </button>
            </Link>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="/images/404.jpg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
