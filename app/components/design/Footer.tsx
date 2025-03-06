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
            فروشگاه اینترنتی جهیزان
          </p>
          <p
            className={`${
              !showMore ? "line-clamp-6 textGradiant " : ""
            } text-sm md:tex-base`}
          >
            جهیزان، یک پلتفرم آنلاین معتبر برای خرید لوازم خانگی و آشپزخانه با
            کیفیت و قیمت‌های رقابتی است. این فروشگاه با ارائه محصولات متنوعی از
            جمله کتری قوری، سماور، سرویس‌های جهیزیه و آشپزخانه، سینی و
            سوفله‌خواری، اردوخوری، ظروف نگهدارنده، سرویس‌های چینی جهیزیه،
            ارکوپال، قاشق و چنگال، و سرویس‌های قابلمه چدنی، به مشتریان امکان
            می‌دهد تا بر اساس نیازها و ترجیحات خود انتخاب کنند. برندهای معتبری
            مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی‌وی‌سی، زرساب،
            راکلند، سامسونگ، ام‌جی‌اس و دیگر برندهای داخلی و خارجی در این
            فروشگاه موجود هستند. جهیزان با تمرکز بر کیفیت و قیمت مناسب، تلاش
            می‌کند تا رضایت مشتریان را افزایش دهد و تجربه خریدی مطلوب را برای
            آن‌ها ایجاد کند. این فروشگاه با ارائه خدمات پس از فروش و پشتیبانی
            فنی، اطمینان حاصل می‌کند که مشتریان پس از خرید نیز از خدمات مناسبی
            برخوردار خواهند بود. جهیزان با استفاده از تکنولوژی پیشرفته،
            فرآیندهای خرید را ساده‌تر کرده و به مشتریان اجازه می‌دهد تا به راحتی
            محصولات مورد نظر خود را پیدا و خریداری کنند. همچنین، این فروشگاه با
            ارائه گارانتی و خدمات تعمیرات، امنیت خرید را برای مشتریان تضمین
            می‌کند. جهیزان با توجه به تنوع محصولات و برندها، به عنوان یک منبع
            جامع برای خرید لوازم خانگی و آشپزخانه شناخته شده است. این فروشگاه با
            ارائه محصولات با کیفیت بالا و قیمت‌های مناسب، به مشتریان کمک می‌کند
            تا فضاهای زندگی خود را با لوازم مدرن و کاربردی تجهیز کنند. با وجود
            دسترسی آسان به اطلاعات محصول و توانایی مقایسه قیمت‌ها، مشتریان
            می‌توانند تصمیمات خرید آگاهانه‌تری بگیرند. در نهایت، جهیزان با ارائه
            خدمات جامع و کیفیت بالای محصولات، به عنوان یک انتخاب اول برای خرید
            لوازم خانگی و آشپزخانه در ایران شناخته شده است. این فروشگاه با تمرکز
            بر رضایت مشتری و ارائه خدمات پس از فروش، به دنبال ایجاد روابط
            بلندمدت با مشتریان خود است.
          </p>
        </div>
        <button
          onClick={() => setShowMore(!showMore)}
          className={`text-[12px] flex gap-1 items-center absolute rounded-[12px] bg-black py-2 px-4 hover:bg-gray-700 text-white font-bold rounded  right-[calc(50%-70px)] ${
            showMore ? "b[-50px]" : "bottom-[-12px]"
          }`}
        >
          مشاهده همه
          {showMore ? <DownArrow /> : <DownArrow />}
        </button>
      </div>
      <div className="grid-cols-2 gap-6  md:grid-cols-4 grid mt-[40px] md:mt-[86px]">
        <div>
          <text className="text-[#20AC73] text-[12px] md:text-xl font-bold">
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
          <text className="text-[#20AC73]  text-[12px] md:text-xl font-bold">
            مرکز تماس
          </text>
          <ul className="flex flex-col gap-2 md:gap-[19px] mt-4 md:mt-6 text-black/70 text-[10px] md:text-sm">
            <li>
              <Link className="flex gap-[10px]" href="tel:02155343819">
                <TelephoneNumberIcon />
                ۰۲۱۵۵۳۴۳۸۱۹
              </Link>
            </li>
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
          <text className="text-[#20AC73]  text-[12px] md:text-xl font-bold">
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
          <text className="text-[#20AC73]  text-[12px] md:text-xl font-bold">
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
            گروه جهیزان
          </text>
        </div>
        <text className="text-sm  md:text-base text-gray-600">
          کلیه حقوق این سایت متعلق به جهیزان می‌باشد.
        </text>
      </div>
    </div>
  );
}
