"use client";
import React, { useState } from "react";
import InstagramIcon from "../icons/instagram";
import WhatsappIcon from "../icons/whatsapp";
import CalenderIcon from "../icons/whatsapp";
import Youtube from "../icons/youtube";
import LocationIcon from "../icons/location";
import WorkingHoursIcon from "../icons/workingHours";
import TelephoneNumberIcon from "../icons/telephoneNumber";
import MailIcon from "../icons/mail";
import Image from "@/node_modules/next/image";
import DownArrow from "../icons/downArrow";
import Link from "@/node_modules/next/link";
import { Aparat, Instagram, Telegram } from "./Icons";

export default function Footer() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className="w-full p-4 md:px-[86px] md:pt-[45px] border-t border-t-gray-200 pb-32 md:pb-0 mt-8"
      style={{ background: " linear-gradient(180deg, #FFF 0%, #D2D2D2 100%)" }}
    >
      <div className="relative">
        <div>
          <p className="peyda text-primary text-lg mb-2 font-bold">
            فروشگاه اینترنتی رایکا سیستم
          </p>
          <p
            className={`${
              !showMore ? "line-clamp-6 textGradiant" : ""
            } text-sm md:text-base`}
          >
            <strong>رایکا سیستم</strong> یکی از فروشگاه‌های تخصصی فروش{" "}
            <strong>قطعات کامپیوتر</strong> و خدمات اسمبل سیستم در ایران است.
            این فروشگاه با ارائه محصولات متنوع شامل{" "}
            <strong>پردازنده (CPU)</strong>، <strong>رم (RAM)</strong>،{" "}
            <strong>کارت گرافیک (GPU)</strong>، <strong>مادربرد</strong>،{" "}
            <strong>هارد اینترنال و اکسترنال</strong>، <strong>SSD</strong>،{" "}
            <strong>پاور</strong>، <strong>کیس گیمینگ</strong> و دیگر تجهیزات،
            توانسته به انتخاب اول بسیاری از کاربران تبدیل شود. رایکا سیستم امکان
            خرید برندهای معتبری مانند{" "}
            <strong>
              Intel، AMD، ASUS، Gigabyte، MSI، Corsair، G.SKILL، Kingston،
              Western Digital، Seagate، Crucial
            </strong>{" "}
            و سایر برندهای مطرح جهانی را فراهم کرده است. شما می‌توانید با خیال
            راحت برای <strong>خرید سی پی یو اینتل</strong>،{" "}
            <strong>خرید کارت گرافیک ASUS</strong>،{" "}
            <strong>خرید رم DDR4 Corsair</strong> یا{" "}
            <strong>خرید هارد اکسترنال WD</strong> از خدمات این فروشگاه استفاده
            کنید. تیم فنی رایکا سیستم با ارائه خدمات{" "}
            <strong>اسمبل حرفه‌ای سیستم</strong> شامل نصب و تست قطعات، کابل‌کشی
            استاندارد، و بهینه‌سازی سیستم برای گیمینگ، طراحی یا کارهای مهندسی،
            تجربه‌ای مطمئن برای کاربران فراهم می‌کند. همچنین امکان دریافت مشاوره
            رایگان برای انتخاب قطعات متناسب با بودجه و کاربرد شما نیز وجود دارد.
            این فروشگاه با تضمین <strong>اصالت کالا</strong>،{" "}
            <strong>گارانتی معتبر</strong>، <strong>ارسال سریع</strong> و{" "}
            <strong>پشتیبانی تخصصی</strong>، تلاش می‌کند تا رضایت کامل مشتریان
            را جلب کند. اگر به دنبال <strong>خرید سیستم گیمینگ</strong>،{" "}
            <strong>خرید قطعات کامپیوتر با قیمت مناسب</strong> یا اسمبل سیستم
            حرفه‌ای هستید، رایکا سیستم گزینه‌ای هوشمندانه برای شماست.
          </p>
        </div>
        <button
          onClick={() => setShowMore(!showMore)}
          className={`text-[12px] flex gap-1 items-center absolute rounded-[12px] bg-black py-2 px-4 hover:bg-gray-700 text-white font-bold right-[calc(50%-70px)] ${
            showMore ? "bottom-[-50px]" : "bottom-[-12px]"
          }`}
        >
          مشاهده همه
          <DownArrow />
        </button>
      </div>

      <div className="grid-cols-2 gap-6  md:grid-cols-4 grid mt-[40px] md:mt-[86px]">
        <div>
          <text className="text-[#5C1891] text-[12px] md:text-xl font-bold">
            خدمات مشتریان
          </text>
          <ul className="flex flex-col gap-2 md:gap-[19px] mt-4 md:mt-6 text-black/70 text-[10px] md:text-sm">
            <li>
              <Link href="/contactus">مرکز تماس</Link>
            </li>
            <li>
              <Link href="/about-us">درباره ما</Link>
            </li>{" "}
            <li>
              <Link href="/pages/rules">قوانین و مقررات</Link>
            </li>{" "}
            <li>
              <Link href="/brands">برند ها</Link>
            </li>{" "}
          </ul>
        </div>
        <div className="">
          <text className="text-[#5C1891]  text-[12px] md:text-xl font-bold">
            مرکز تماس
          </text>
          <ul className="flex flex-col gap-2 md:gap-[19px] mt-4 md:mt-6 text-black/70 text-[10px] md:text-sm">
            {/* <li>
              <Link className="flex gap-[10px]" href="tel:02155343819">
                <TelephoneNumberIcon />
                ۰۲۱۵۵۳۴۳۸۱۹
              </Link>
            </li> */}
            {/* <li>
              <Link className="flex gap-[10px]" href="tel:09102421305">
                <TelephoneNumberIcon />
                ۰۹۱۰۲۴۲۱۳۰۵
              </Link>
            </li> */}
            <li>
              <Link
                className="flex gap-[10px]"
                href="https://wa.me/message/5A2VRRDWH4WRM1"
              >
                <TelephoneNumberIcon />
                پشتیبانی واتساپ
              </Link>
            </li>
            <li>
              <Link
                className="flex gap-[10px]"
                href="https://t.me/Jahizan_admin"
              >
                <TelephoneNumberIcon />
                پشتیبانی تلگرام
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <text className="text-[#5C1891]  text-[12px] md:text-xl font-bold">
            شعبه شوش
          </text>
          <ul className="flex flex-col gap-2 md:gap-[19px] mt-4 md:mt-6 text-black/70 ext-[10px] text-[10px] md:text-sm">
            <li className="flex gap-3">
              <LocationIcon />
              تهران میدان شوش خیابان صابونیان مجتمع الماس طبقه سوم پلاک ۷۹۶
            </li>
            <li className="flex gap-3 text-[#0272c8] font-bold">
              ساعت پاسخگویی ۱۰ الی ۱۷
            </li>
          </ul>
        </div>
        <div>
          <text className="text-[#5C1891]  text-[12px] md:text-xl font-bold">
            شبکه های اجتماعی
          </text>
          <ul className="flex flex-row gap-2 md:gap-[19px] mt-4 md:mt-6 text-black/70 text-[10px] md:text-sm">
            <li>
              <Link href="https://t.me/jahizancom">
                <Telegram />
              </Link>
            </li>
            <li>
              <Link href="https://instagram.com/jahizancom">
                <Instagram />
              </Link>
            </li>
            <li>
              <Link href="https://aparat.com/jahizan">
                <Aparat />
              </Link>
            </li>
          </ul>
          <a
            referrerPolicy="origin"
            target="_blank"
            href="https://trustseal.enamad.ir/?id=281567&Code=gMGXdvTIZekiTfqO9Ocg"
          >
            <img
              referrerPolicy="origin"
              src="https://trustseal.enamad.ir/logo.aspx?id=281567&Code=gMGXdvTIZekiTfqO9Ocg"
              alt=""
              className="cursor-pointer"
              code="gMGXdvTIZekiTfqO9Ocg"
            />
          </a>
        </div>
      </div>
      <div className="mt-[31px] flex hsba(240, 40%, 33%, 1), hsba(0, 0%, 0%, 0) items-center gap-4 justify-between border-t border-t-gray-400 pt-3">
        <div>
          <Image
            alt="Header Offer"
            src={"/images/logo 1.png"}
            width={44}
            height={44}
            className="bg-white p-2 rounded-md ml-3"
          />
          <text className=" text-black font-normal text-base hidden md:inline">
            گروه رایکا سیستم
          </text>
        </div>
        <text className="text-sm  md:text-base text-gray-600">
          کلیه حقوق این سایت متعلق به رایکا سیستم می‌باشد.
        </text>
      </div>
    </div>
  );
}
