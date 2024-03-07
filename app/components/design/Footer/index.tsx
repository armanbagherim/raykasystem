"use client"
import React, { useState } from 'react'
import InstagramIcon from '../../icons/instagram'
import WhatsappIcon from '../../icons/whatsapp'
import CalenderIcon from '../../icons/whatsapp'
import Youtube from '../../icons/youtube'
import LocationIcon from "../../icons/location"
import WorkingHoursIcon from "../../icons/workingHours"
import TelephoneNumberIcon from "../../icons/telephoneNumber"
import MailIcon from "../../icons/mail"
import Image from '@/node_modules/next/image'
import DownArrow from '../../icons/downArrow'
import Link from '@/node_modules/next/link'


export default function Footer() {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="w-full p-4 md:px-[86px] md:pt-[92px]" style={{ background: " linear-gradient(180deg, #FFF 0%, #D2D2D2 100%)" }}>
            <div className="flex justify-between p-2 md:p-6 bg-[#20AC73] text-white w-full rounded-[8px] md:rounded-[26px] text-lg font-bold">
                <text className="text-[12px] md:text-lg ">
                    مارا در شبکه های اجتماعی دنبال کنید
                </text>
                <div className="flex gap-[6px] md:gap-[10px]">
                    <Link href={"#"} >
                        <WhatsappIcon />
                    </Link>
                    <Link href={"#"} >
                        <InstagramIcon />
                    </Link>
                    <Link href={"#"} >
                        <Youtube />
                    </Link>
                </div>
            </div>
            <div className="grid-cols-2 gap-6  md:grid-cols-4 grid mt-[40px] md:mt-[86px]">
                <div>
                    <text className="text-[#20AC73] text-[12px] md:text-xl font-bold">خدمات مشتریان</text>
                    <ul className="flex flex-col gap-2 md:gap-[19px] mt-4 md:mt-6 text-black/70 text-[10px] md:text-sm">
                        <li>سوالات متداول</li>
                        <li>حساب کاربری</li>
                        <li>شرایط استفاده</li>
                        <li>حریم خصوصی</li>
                        <li>فروشنده شوید</li>
                    </ul>
                </div>
                <div>
                    <text className="text-[#20AC73]  text-[12px] md:text-xl  font-bold">دسترسی سریع</text>
                    <ul className="flex flex-col gap-2 md:gap-[19px] mt-4 md:mt-6text-black/70 text-[10px] md:text-sm">
                        <li>پیگیری سفارش</li>
                        <li>مرکز تماس</li>
                        <li>علاقه مندی ها</li>
                        <li>همکاری در فروش</li>
                        <li>تماس با ما</li>
                    </ul>
                </div>
                <div>
                    <text className="text-[#20AC73]  text-[12px] md:text-xl  font-bold">هدر تستی</text>
                    <ul className="flex flex-col gap-2 md:gap-[19px] mt-4 md:mt-6 text-black/70 text-[10px] md:text-sm">
                        <li>پیگیری سفارش</li>
                        <li>مرکز تماس</li>
                        <li>علاقه مندی ها</li>
                        <li>همکاری در فروش</li>
                        <li>تماس با ما</li>
                    </ul>
                </div>
                <div>
                    <text className="text-[#20AC73]  text-[12px] md:text-xl font-bold">شعبه شوش</text>
                    <ul className="flex flex-col gap-2 md:gap-[19px] mt-4 md:mt-6 text-black/70 ext-[10px] text-[10px] md:text-sm">
                        <li className="flex gap-3">
                            <LocationIcon />
                            این یک آدرس تستی است برای فروشگاه جهیزان که نمیدونم چیه دقیقا</li>
                        <li className="flex gap-3">
                            <WorkingHoursIcon />
                            شنبه تا پنج شنبه ۱۱ صبح تا ۸ بعدازظهر</li>
                        <li className="flex gap-[10px]"><TelephoneNumberIcon />
                            ۰۲۱-۲۲۱۴۷۹۱۲</li>
                        <li className="flex gap-[10px]"><MailIcon />
                            info@jahizan.com
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-[31px] flex items-end hsba(240, 40%, 33%, 1), hsba(0, 0%, 0%, 0)">
                <Image
                    alt="Header Offer"
                    src={"/images/logo 1.png"}
                    width={44}
                    height={44}
                />
                <text className=" text-black font-normal text-base ">گروه جهیزان</text>
            </div>
            <div className="relative">
                <div >
                    <p className={`${!showMore ? "line-clamp-6 textGradiant " : ""} text-sm md:tex-base`}>
                        {/* className={`${showMore ? "line-clamp-6 textGradiant" : "" } textGradiant`} */}
                        جهیزان تمامی محصولات لوازم خانه و آشپزخانه را با کیفیت اصلی و قیمت های شرکتی عرضه میکند. انواع کتری قوری، سماور، سرویس جهیزیه یا سرویس آشپزخانه، سینی و سوفله خوری، اردو خوری، ظروف نگهدارنده، سرویس های چینی جهیزیه، ارکوپال، قاشق چنگال، سرویس قابلمه چدن و ... با بهترین برندهای ایرانی و خارجی مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی وی کی، زرساب، راکلند، سامسونگ، ام جی اس و ... از جهیزان قابل خرید میباشند.
                        <br />
                        جهیزان تمامی محصولات لوازم خانه و آشپزخانه را با کیفیت اصلی و قیمت های شرکتی عرضه میکند. انواع کتری قوری، سماور، سرویس جهیزیه یا سرویس آشپزخانه، سینی و سوفله خوری، اردو خوری، ظروف نگهدارنده، سرویس های چینی جهیزیه، ارکوپال، قاشق چنگال، سرویس قابلمه چدن و ... با بهترین برندهای ایرانی و خارجی مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی وی کی، زرساب، راکلند، سامسونگ، ام جی اس و ... از جهیزان قابل خرید میباشند.
                        جهیزان تمامی محصولات لوازم خانه و آشپزخانه را با کیفیت اصلی و قیمت های شرکتی عرضه میکند. انواع کتری قوری، سماور، سرویس جهیزیه یا سرویس آشپزخانه، سینی و سوفله خوری، اردو خوری، ظروف نگهدارنده، سرویس های چینی جهیزیه، ارکوپال، قاشق چنگال، سرویس قابلمه چدن و ... با بهترین برندهای ایرانی و خارجی مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی وی کی، زرساب، راکلند، سامسونگ، ام جی اس و ... از جهیزان قابل خرید میباشند.
                        جهیزان تمامی محصولات لوازم خانه و آشپزخانه را با کیفیت اصلی و قیمت های شرکتی عرضه میکند. انواع کتری قوری، سماور، سرویس جهیزیه یا سرویس آشپزخانه، سینی و سوفله خوری، اردو خوری، ظروف نگهدارنده، سرویس های چینی جهیزیه، ارکوپال، قاشق چنگال، سرویس قابلمه چدن و ... با بهترین برندهای ایرانی و خارجی مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی وی کی، زرساب، راکلند، سامسونگ، ام جی اس و ... از جهیزان قابل خرید میباشند.
                        جهیزان تمامی محصولات لوازم خانه و آشپزخانه را با کیفیت اصلی و قیمت های شرکتی عرضه میکند. انواع کتری قوری، سماور، سرویس جهیزیه یا سرویس آشپزخانه، سینی و سوفله خوری، اردو خوری، ظروف نگهدارنده، سرویس های چینی جهیزیه، ارکوپال، قاشق چنگال، سرویس قابلمه چدن و ... با بهترین برندهای ایرانی و خارجی مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی وی کی، زرساب، راکلند، سامسونگ، ام جی اس و ... از جهیزان قابل خرید میباشند.
                        جهیزان تمامی محصولات لوازم خانه و آشپزخانه را با کیفیت اصلی و قیمت های شرکتی عرضه میکند. انواع کتری قوری، سماور، سرویس جهیزیه یا سرویس آشپزخانه، سینی و سوفله خوری، اردو خوری، ظروف نگهدارنده، سرویس های چینی جهیزیه، ارکوپال، قاشق چنگال، سرویس قابلمه چدن و ... با بهترین برندهای ایرانی و خارجی مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی وی کی، زرساب، راکلند، سامسونگ، ام جی اس و ... از جهیزان قابل خرید میباشند.
                        جهیزان تمامی محصولات لوازم خانه و آشپزخانه را با کیفیت اصلی و قیمت های شرکتی عرضه میکند. انواع کتری قوری، سماور، سرویس جهیزیه یا سرویس آشپزخانه، سینی و سوفله خوری، اردو خوری، ظروف نگهدارنده، سرویس های چینی جهیزیه، ارکوپال، قاشق چنگال، سرویس قابلمه چدن و ... با بهترین برندهای ایرانی و خارجی مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی وی کی، زرساب، راکلند، سامسونگ، ام جی اس و ... از جهیزان قابل خرید میباشند.
                        جهیزان تمامی محصولات لوازم خانه و آشپزخانه را با کیفیت اصلی و قیمت های شرکتی عرضه میکند. انواع کتری قوری، سماور، سرویس جهیزیه یا سرویس آشپزخانه، سینی و سوفله خوری، اردو خوری، ظروف نگهدارنده، سرویس های چینی جهیزیه، ارکوپال، قاشق چنگال، سرویس قابلمه چدن و ... با بهترین برندهای ایرانی و خارجی مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی وی کی، زرساب، راکلند، سامسونگ، ام جی اس و ... از جهیزان قابل خرید میباشند.
                        جهیزان تمامی محصولات لوازم خانه و آشپزخانه را با کیفیت اصلی و قیمت های شرکتی عرضه میکند. انواع کتری قوری، سماور، سرویس جهیزیه یا سرویس آشپزخانه، سینی و سوفله خوری، اردو خوری، ظروف نگهدارنده، سرویس های چینی جهیزیه، ارکوپال، قاشق چنگال، سرویس قابلمه چدن و ... با بهترین برندهای ایرانی و خارجی مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی وی کی، زرساب، راکلند، سامسونگ، ام جی اس و ... از جهیزان قابل خرید میباشند.
                        جهیزان تمامی محصولات لوازم خانه و آشپزخانه را با کیفیت اصلی و قیمت های شرکتی عرضه میکند. انواع کتری قوری، سماور، سرویس جهیزیه یا سرویس آشپزخانه، سینی و سوفله خوری، اردو خوری، ظروف نگهدارنده، سرویس های چینی جهیزیه، ارکوپال، قاشق چنگال، سرویس قابلمه چدن و ... با بهترین برندهای ایرانی و خارجی مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی وی کی، زرساب، راکلند، سامسونگ، ام جی اس و ... از جهیزان قابل خرید میباشند.
                        جهیزان تمامی محصولات لوازم خانه و آشپزخانه را با کیفیت اصلی و قیمت های شرکتی عرضه میکند. انواع کتری قوری، سماور، سرویس جهیزیه یا سرویس آشپزخانه، سینی و سوفله خوری، اردو خوری، ظروف نگهدارنده، سرویس های چینی جهیزیه، ارکوپال، قاشق چنگال، سرویس قابلمه چدن و ... با بهترین برندهای ایرانی و خارجی مانند لیمون، چینی زرین، یونیک، کاراجا، کرکماز، بی وی کی، زرساب، راکلند، سامسونگ، ام جی اس و ... از جهیزان قابل خرید میباشند.
                    </p>
                </div>
                <button onClick={() => setShowMore(!showMore)} className={`text-[12px] flex gap-1 items-center absolute rounded-[12px] bg-black py-2 px-4 hover:bg-gray-700 text-white font-bold rounded  right-[calc(50%-70px)] ${showMore ? "b[-50px]" : "bottom-[-12px]"}`}>
                    مشاهده همه
                    {showMore ? <DownArrow /> : <DownArrow />}
                </button>
            </div>
            <div className="mt-[28px] flex flex-col md:flex-row justify-between items-center pb-[11px]">
                <div className="flex flex-col ">
                    <text className="font-bold text-sm  md:text-base text-black mb-[11px]">کلیه حقوق این سایت متعلق به جهیزان می‌باشد.</text>
                    <text className="text-[12px] md:text-base text-black font-[100]">طراحی توسط گروه تست</text>
                </div>
                <div className="flex mt-4 md:mt-0">
                    <Image alt="firstFlag"
                        src={"/images/firstFlag.png"}
                        width={52}
                        height={104} />
                    <Image alt="secondFlag"
                        src={"/images/secondFlag.png"}
                        width={52}
                        height={104} />
                    <Image alt="ThirdFlag"
                        src={"/images/thirdFlag.png"}
                        width={52}
                        height={104} />
                    <Image alt="fourthFlag"
                        src={"/images/fourthFlag.png"}
                        width={52}
                        height={104} />
                </div>
            </div>
        </div>

    );
}
