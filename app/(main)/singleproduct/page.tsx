import Breadcrumb from "@/app/components/design/Breadcrumb";
import product from "../../../public/images/product-1.png";
import { url } from "inspector";
import Link from "next/link";

import {
  Cart,
  Backtitle,
  Zoomin,
  Heartadd,
  Play,
  Goldstart,
  Category2,
  Smallcat,
  Toogle,
  Espesial,
  Tickstar,
  Exclamation,
  Exclamationitalic,
  Trucktick,
  Locationicon,
  Lineonnum,
  Infocircle,
  Tickcircle,
  Tickstarwhite,
  Exclamationreport,
  Like,
  Unlike,
} from "@/app/components/design/Icons";

const SingleProduct = () => {
  return (
    <>
      <Breadcrumb />
      <div className="container justify-center mx-auto mt-3 grid grid-cols-12 gap-8">
        <div className="col-span-4 border-0 rounded-lg relative">
          <div className="w-10 h-32 absolute r-0 t-0 mt-4 mr-3 rounded-3xl bg-customGray">
            <div className="pt-3.5 mr-3">
              <Link href="#">
                <Zoomin />
              </Link>
            </div>
            <div className="pt-5 mr-3">
              <Link href="#">
                <Heartadd />
              </Link>
            </div>
            <div className="pt-5 mr-3">
              <Link href="#">
                <Play />
              </Link>
            </div>
          </div>
          <div className="p-3 pr-9 pt-0 mr-0 pb-6">
            <img
              className="w-full"
              src="/images/product-single.png"
              width="250"
            />
          </div>
        </div>

        <div className="col-span-5 rounded-lg">
          <div className="text-center font-normal text-2xl text-slate-500">
            اتو بخار فیلیپس مدل 7040 (2800 وات)
          </div>
          <div className="text-center font-normal text-sm mt-2 text-slate-400">
            Huda beauty fauxfilter foundation
          </div>

          <div>
            <div className="flex gap-4 justify-center mx-auto">
              <div className="mt-5 w-60 h-10 bg-customGray rounded-2xl">
                <div className="pt-2.5 mr-3 flex gap-2 text-slate-500">
                  <div className="pt-0.5">
                    <Goldstart />
                  </div>
                  <div>4.75 از 4240 نظر</div>
                </div>
              </div>
              <div className="mt-5 w-2/3 h-10 bg-customGray rounded-2xl">
                <div className="pt-2.5 mr-3 flex gap-2 text-slate-500">
                  <div className="pt-1">
                    <Category2 />
                  </div>
                  <div className="flex gap-1">
                    <div className="font-bold">برند: </div>
                    <div>تارورس</div>
                  </div>
                  <div className="justify-start mx-auto ml-2">
                    <div className="pt-0.5 justify-center flex mx-auto w-12 bg-slate-50 rounded-xl">
                      <Smallcat />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 w-auto h-10 bg-customGray rounded-2xl">
              <div className="pt-2.5 mr-3 flex gap-2 text-slate-500">
                <div className="pt-0.5">
                  <Category2 />
                </div>
                <div className="flex gap-1">
                  <div className="font-bold">دسته: </div>
                  <div>لوازم آشپزخانه، لوازم برقی، لوازم تستی</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-7 mb-7 font-bold text-lg">انتخاب رنگ</div>
          <div className="flex gap-6">
            <div className="flex items-center my-auto gap-2">
              <div className="bg-[#E65B7C] w-8 h-8 rounded-full inline"></div>
              <div>قرمز</div>
            </div>
            <div className="flex items-center my-auto gap-2">
              <div className="bg-[#E65B7C] w-8 h-8 rounded-full inline"></div>
              <div>آبی</div>
            </div>
            <div className="flex items-center my-auto gap-2">
              <div className="bg-[#E65B7C] w-8 h-8 rounded-full inline"></div>
              <div>سبز</div>
            </div>
          </div>

          <div className="mt-10 justify-center mx-auto p-5 flex gap-72">
            <ul className="list-disc text-sm leading-7">
              <li className="text-slate-800">مورد کوتاه 1</li>
              <li className="text-slate-600">مورد کوتاه 2</li>
              <li className="text-slate-500">مورد کوتاه بلندتر 1</li>
              <li className="text-slate-400">مورد کوتاه بلندتر 2</li>
              <li className="text-slate-300">مورد کوتاه بلندتر 3</li>
            </ul>
            <ul className="list-disc text-sm leading-7">
              <li className="text-slate-800">مورد کوتاه 1</li>
              <li className="text-slate-600">مورد کوتاه 2</li>
              <li className="text-slate-500">مورد کوتاه بلندتر 1</li>
              <li className="text-slate-400">مورد کوتاه بلندتر 2</li>
              <li className="text-slate-300">مورد کوتاه بلندتر 3</li>
            </ul>
          </div>
          <div className="flex justify-center mx-auto gap-4">
            <div>مشاهده بیشتر</div>
            <div className="flex my-auto">
              <Toogle />
            </div>
          </div>
        </div>

        <div className="col-span-3  rounded-3xl bg-customGray">
          <div className="px-4 pt-0 mr-0">
            <div className="flex justify-end ml-0 mx-auto">
              <Espesial />
            </div>
            <div className="text-primary">چرا از جهیزان خرید کنم؟</div>
            <div className="mt-5">
              <div className="flex gap-1 mt-3">
                <div>
                  <Tickstar />
                </div>
                <div>
                  گارانتی{" "}
                  <span className="font-bold text-primary">
                    12 ماهه مادیران
                  </span>
                </div>
                <div className="my-auto justify-start mx-auto ml-4">
                  <Exclamation />
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <div>
                  <Exclamationitalic />
                </div>
                <div>
                  امکان خرید در{" "}
                  <span className="font-bold text-primary">4 قسط</span>
                </div>
                <div className="my-auto justify-start mx-auto ml-4">
                  <Exclamation />
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <div>
                  <Trucktick />
                </div>
                <div>
                  ارسال تا <span className="font-bold text-primary">3</span> روز
                  آینده
                </div>
                <div className="my-auto justify-start mx-auto ml-4">
                  <Exclamation />
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <div>
                  <Locationicon />
                </div>
                <div>
                  گارانتی{" "}
                  <span className="font-bold text-primary">
                    12 ماهه مادیران
                  </span>
                </div>
                <div className="my-auto justify-start mx-auto ml-4">
                  <Exclamation />
                </div>
              </div>
            </div>
            <div className="mt-20 flex items-end">
              <div className="pb-0.5">
                فروشنده: <span className="font-bold text-primary">جهیزان</span>
              </div>
              <div
                className="font-bold justify-start mx-auto ml-2 items-end my-auto"
                dir="ltr"
              >
                <div className="text-center bg-[#E2F0EB] text-primary text-xs rounded-ss-xl rounded-e-xl py-2 px-3 mb-1">
                  قیمت نقدی
                </div>
                <div dir="rtl">125000 تومان</div>
              </div>
            </div>

            <div className="mt-9 flex gap-3 mb-4">
              <div>
                <div className="bg-primary text-slate-100 font-bold text-xl p-1 w-9 rounded-lg text-center items-center">
                  23
                </div>
                <div>ثانیه</div>
              </div>
              <div>
                <div className="bg-primary text-slate-100 font-bold text-xl p-1 w-9 rounded-lg text-center items-center">
                  23
                </div>
                <div>دقیقه</div>
              </div>
              <div>
                <div className="bg-primary text-slate-100 font-bold text-xl p-1 w-9 rounded-lg text-center items-center">
                  23
                </div>
                <div>ساعت</div>
              </div>
              <div
                className="font-bold justify-start mx-auto ml-2 items-end my-auto"
                dir="ltr"
              >
                <div className="flex items-center my-auto gap-1">
                  <div className="text-center bg-primary text-slate-100 rounded-xl p-1 w-10">
                    14%
                  </div>
                  <div className="relative">
                    <div className="absolute top-1 w-10 text-slate-950">
                      <Lineonnum />
                    </div>
                    <div className="text-slate-400 text-sm">155000</div>
                  </div>
                </div>

                <div dir="rtl">
                  <span>125000</span> تومان
                </div>
              </div>
            </div>
            <div className="text-center mx-auto">
              <button className="bg-primary text-white p-4 w-full rounded-3xl items-center flex-row flex justify-center">
                <span className="ml-4">
                  <Cart />
                </span>
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-5 gap-10 bg-customGray rounded-3xl p-5">
        <div className="font-bold">فروشندگان این رنگ</div>

        <div className="mt-5 text-xl">
          <div className="bg-white flex rounded-xl p-2 gap-14 items-center">
            <div className="text-primary text-base">
              پردازش گستر برتر خلیج فارس
            </div>
            <div className="text-base">گارانتی 18 ماهه مادیران</div>
            <div className="bg-[#E6F3FF] p-4 rounded-3xl text-sm text-[#008AFA]">
              ارسال فقط به شهر تهران
            </div>
            <div className="flex gap-10 text-center mx-auto ml-1">
              <div className="items-center my-auto">125000 تومان</div>
              <button className="bg-primary text-slate-100 p-3 text-sm rounded-2xl items-center my-auto">
                <div className="flex gap-3">
                  <div>
                    <Cart />
                  </div>
                  <div className="items-center my-auto justify-start ml-0 mx-auto">
                    <div>افزودن به سبد خرید</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 text-xl">
          <div className="bg-white flex rounded-xl p-2 gap-14 items-center">
            <div className="text-green-700 text-base">
              پردازش گستر برتر خلیج فارس
            </div>
            <div className="text-base">گارانتی 18 ماهه مادیران</div>
            {/* <div className="bg-[#E6F3FF] p-4 rounded-3xl text-sm text-[#008AFA]">
              ارسال فقط به شهر تهران
            </div> */}
            <div className="flex gap-10 text-center mx-auto ml-1">
              <div className="items-center my-auto">125000 تومان</div>
              <button className="bg-primary text-slate-100 p-3 text-sm rounded-2xl items-center my-auto">
                <div className="flex gap-3">
                  <div>
                    <Cart />
                  </div>
                  <div className="items-center my-auto justify-start ml-0 mx-auto">
                    <div>افزودن به سبد خرید</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 text-xl">
          <div className="bg-white flex rounded-xl p-2 gap-14 items-center">
            <div className="text-green-700 text-base">
              پردازش گستر برتر خلیج فارس
            </div>
            <div className="text-base">گارانتی 18 ماهه مادیران</div>
            <div className="bg-[#E6F3FF] p-4 rounded-3xl text-sm text-[#008AFA]">
              ارسال فقط به شهر تهران
            </div>
            <div className="flex gap-10 text-center mx-auto ml-1">
              <div className="items-center my-auto">125000 تومان</div>
              <button className="bg-primary text-slate-100 p-3 text-sm rounded-2xl items-center my-auto">
                <div className="flex gap-3">
                  <div>
                    <Cart />
                  </div>
                  <div className="items-center my-auto justify-start ml-0 mx-auto">
                    <div>افزودن به سبد خرید</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-5 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-5 flex">
        <div className="mr-3 text-green-700">نقد و بررسی محصول</div>
        <div>مشخصات محصول</div>
        <div>نظرات</div>
      </div>

      <div className="container mx-auto mt-5 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-8 w-auto">
        <div className="flex gap-7">
          <div>
            <img src="/images/makup1.png" className="object-none rounded-3xl" />
          </div>
          <div className="w-5/6 mt-7">
            <div className="text-2xl font-bold text-slate-900">
              عنوان نقد و بررسی قالب1
            </div>
            <div className="text-sm text-slate-400 mt-5 text-justify">
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-14">
          <div>
            <div className="text-2xl font-bold text-slate-900">
              عنوان نقد و بررسی قالب2
            </div>
            <div className="text-sm text-slate-400 mt-5 text-justify">
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-7 mt-14">
          <div className="w-5/6">
            <div className="text-2xl font-bold text-slate-900">
              عنوان نقد و بررسی قالب1
            </div>
            <div className="text-sm text-slate-400 mt-5 text-justify">
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
          </div>
          <div className="mt-5">
            <img src="/images/makup2.png" className="object-none rounded-3xl" />
          </div>
        </div>

        <div className="mt-12">
          <img src="/images/Frame 8.png" className="w-full" />
        </div>
      </div>

      <div className="container mx-auto mt-8 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-8 pb-60">
        <div>مشخصات کامل محصول</div>
        <div className="mt-8 text-sm">
          <div className="flex gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28">توان مصرفی</div>
            <div className="mr-10 text-slate-600">1500 وات</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28">ظرفیت</div>
            <div className="mr-10 text-slate-600">3.5 لیتر</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28 gap-1 flex items-center my-auto">
              <div>صفحه نمایش</div>
              <div>
                <Infocircle />
              </div>
            </div>
            <div className="mr-10 text-slate-600">لمسی دیجیتال</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28 gap-1 flex items-center my-auto">
              <div>تایمر</div>
            </div>
            <div className="mr-10 text-slate-600">تا 30 دقیقه</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28 gap-1 flex items-center my-auto">
              <div>انتخابگر دما</div>
            </div>
            <div className="mr-10 text-slate-600">تا 200 درجه سانتیگراد</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28 gap-1 flex items-center my-auto">
              <div>رنگ ها</div>
            </div>
            <div className="mr-10 text-slate-600">سفید، مشکی</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28 gap-1 flex items-center my-auto">
              <div>ضد آب</div>
            </div>
            <div className="mr-10 text-slate-600">
              <Tickcircle />
            </div>
          </div>
          <hr />
          <div className="flex gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28">توان مصرفی</div>
            <div className="mr-10 text-slate-600">1500 وات</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28">ظرفیت</div>
            <div className="mr-10 text-slate-600">3.5 لیتر</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28 gap-1 flex items-center my-auto">
              <div>صفحه نمایش</div>
              <div>
                <Infocircle />
              </div>
            </div>
            <div className="mr-10 text-slate-600">لمسی دیجیتال</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28 gap-1 flex items-center my-auto">
              <div>تایمر</div>
            </div>
            <div className="mr-10 text-slate-600">تا 30 دقیقه</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28 gap-1 flex items-center my-auto">
              <div>انتخابگر دما</div>
            </div>
            <div className="mr-10 text-slate-600">تا 200 درجه سانتیگراد</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28 gap-1 flex items-center my-auto">
              <div>رنگ ها</div>
            </div>
            <div className="mr-10 text-slate-600">سفید، مشکی</div>
          </div>
          <hr />
          <div className="flex flex-shrink gap-48 pt-3 pb-3">
            <div className="text-green-500 w-28 gap-1 flex items-center my-auto">
              <div>ضد آب</div>
            </div>
            <div className="mr-10 text-slate-600">
              <Tickcircle />
            </div>
          </div>
          <hr />
        </div>
      </div>

      <div className="container mx-auto mt-8 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-8">
        <div className="w-full">امتیاز و دیدگاه کاربران</div>
        <div className="mt-8 flex gap-5">
          <div className="border-0 rounded-xl p-3 w-96">
            <div className="flex gap-6">
              <div className="p-4  bg-slate-100 rounded-xl">
                <div className="flex gap-1">
                  <div className="items-center my-auto">
                    <Goldstart />
                  </div>
                  <div className="text-slate-600 items-center my-auto font-bold">
                    4.75
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-1 ml-0">
                  از 4240 نظر
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400">
                  شما هم در مورد این کالا دیدگاه ثبت کنید
                </div>
                <div className="flex mt-2 justify-center mx-auto">
                  <button className="border-2 border-green-700 text-green-700 p-3 text-sm rounded-2xl items-center my-auto w-full">
                    <div className="items-center my-auto justify-start ml-0 mx-auto">
                      <div>ثبت دیدگاه جدید</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">قیمت و ارزش خرید</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "80%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">ترکیبات رنگی</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "70%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">حجم و کیفیت</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "60%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">شباهت یا مغایرت</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "40%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "90%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">قیمت و ارزش خرید</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "80%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">قیمت و ارزش خرید</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "90%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "90%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="border-0 w-full rounded-xl mt-5">
              <div className="border w-full rounded-3xl m-2 p-3">
                <div className="flex gap-4">
                  <div className="text-md items-center my-auto">
                    آرمان باقری
                  </div>
                  <span className="items-center my-auto">|</span>
                  <div className="text-md items-center my-auto">
                    22 بهمن 1402{" "}
                  </div>
                  <div className="flex gap-3 bg-primary w-fit p-3 rounded-xl text-slate-100">
                    <div>
                      <Tickstarwhite />
                    </div>
                    <div>خریدار رنگ کرمی قرمز</div>
                  </div>
                  <div className="flex gap-1 items-center my-auto justify-start mx-auto ml-2">
                    <div>
                      <Exclamationreport />
                    </div>
                    <div className="text-xs text-green-500 mt-1">گزارش</div>
                  </div>
                </div>
                <div className="mt-8 mb-10 text-sm text-slate-500">
                  من این ریمیل رو چون قیمتش نسبت به بازار که فیک بود گرونتر
                  گرفتم چون فکر میکردم کیفیت بالاتر و اصل هست حداقل ۱۰۰ الی ۱۵۰
                  تومن گرونتر خریدم و دیگه هیچ وقت خرید ریمل آرایشی نخواهم داشت
                </div>
                <div className="flex gap-3 justify-end mx-auto">
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">42</div>
                    <div className="text-xs items-center my-auto">
                      <Like />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">12</div>
                    <div className="text-xs items-center my-auto">
                      <Unlike />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-0 w-full rounded-xl mt-5">
              <div className="border w-full rounded-3xl m-2 p-3">
                <div className="flex gap-4">
                  <div className="text-md items-center my-auto">
                    آرمان باقری
                  </div>
                  <span className="items-center my-auto">|</span>
                  <div className="text-md items-center my-auto">
                    22 بهمن 1402{" "}
                  </div>
                  <div className="flex gap-3 bg-primary w-fit p-3 rounded-xl text-slate-100">
                    <div>
                      <Tickstarwhite />
                    </div>
                    <div>خریدار رنگ کرمی قرمز</div>
                  </div>
                  <div className="flex gap-1 items-center my-auto justify-start mx-auto ml-2">
                    <div>
                      <Exclamationreport />
                    </div>
                    <div className="text-xs text-green-500 mt-1">گزارش</div>
                  </div>
                </div>
                <div className="mt-8 mb-10 text-sm text-slate-500">
                  من این ریمیل رو چون قیمتش نسبت به بازار که فیک بود گرونتر
                  گرفتم چون فکر میکردم کیفیت بالاتر و اصل هست حداقل ۱۰۰ الی ۱۵۰
                  تومن گرونتر خریدم و دیگه هیچ وقت خرید ریمل آرایشی نخواهم داشت
                </div>
                <div className="flex gap-3 justify-end mx-auto">
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">42</div>
                    <div className="text-xs items-center my-auto">
                      <Like />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">12</div>
                    <div className="text-xs items-center my-auto">
                      <Unlike />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-0 w-full rounded-xl mt-5">
              <div className="border w-full rounded-3xl m-2 p-3">
                <div className="flex gap-4">
                  <div className="text-md items-center my-auto">
                    آرمان باقری
                  </div>
                  <span className="items-center my-auto">|</span>
                  <div className="text-md items-center my-auto">
                    22 بهمن 1402{" "}
                  </div>
                  <div className="flex gap-3 bg-primary w-fit p-3 rounded-xl text-slate-100">
                    <div>
                      <Tickstarwhite />
                    </div>
                    <div>خریدار رنگ کرمی قرمز</div>
                  </div>
                  <div className="flex gap-1 items-center my-auto justify-start mx-auto ml-2">
                    <div>
                      <Exclamationreport />
                    </div>
                    <div className="text-xs text-green-500 mt-1">گزارش</div>
                  </div>
                </div>
                <div className="mt-8 mb-10 text-sm text-slate-500">
                  من این ریمیل رو چون قیمتش نسبت به بازار که فیک بود گرونتر
                  گرفتم چون فکر میکردم کیفیت بالاتر و اصل هست حداقل ۱۰۰ الی ۱۵۰
                  تومن گرونتر خریدم و دیگه هیچ وقت خرید ریمل آرایشی نخواهم داشت
                </div>
                <div className="flex gap-3 justify-end mx-auto">
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">42</div>
                    <div className="text-xs items-center my-auto">
                      <Like />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">12</div>
                    <div className="text-xs items-center my-auto">
                      <Unlike />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-3 justify-start mx-auto gap-2" dir="ltr">
          <div>
            <button className="bg-[#B8B8B8] p-2 text-white pl-5 pr-5 rounded-lg hover:bg-slate-600 text-2xl">
              1
            </button>
          </div>
          <div>
            <button className="bg-[#B8B8B8] p-2 text-white pl-5 pr-5 rounded-lg hover:bg-slate-600 text-2xl">
              2
            </button>
          </div>
          <div>
            <button className="bg-primary p-2 text-white pl-5 pr-5 rounded-lg hover:bg-slate-600 text-2xl">
              3
            </button>
          </div>
        </div>
      </div>
      <div className="relative container mx-auto mt-8 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-8">
        <div className="flex pb-5 relative">
          <div className="absolute">
            <Backtitle />
          </div>
          <div className="font-bold text-2xl items-center p-3 text-primary">
            محصولات مرتبط
          </div>
        </div>

        <div className="p-3 flex">
          <div className="w-fit p-5 rounded-xl">
            <div className="ml-0 border-2 rounded-3xl">
              <div className="pr-4 pt-0 mr-0 pb-6">
                <div className="flex justify-end ml-0 mx-auto">
                  <Espesial />
                </div>
                <div className="flex bg-customGray w-fit p-1 rounded-lg gap-2">
                  <div>
                    <Goldstart />
                  </div>
                  <div className="text-xs items-center my-1 pl-2">4.75</div>
                </div>

                <div className="flex mt-5 justify-center mx-auto">
                  <img src="/images/01-3-824x1024.png" width={100} />
                </div>
                <div className="mt-1 flex items-end text-sm text-slate-700 p-1 text-center">
                  محصول آزمایشی با حدود 2 خط متن یه کم طولانی
                </div>

                <div className="mt-9 flex gap-3">
                  <div
                    className="font-bold justify-start mx-auto ml-2 items-end my-auto"
                    dir="ltr"
                  >
                    <div className="flex items-center my-auto gap-1">
                      <div className="text-center bg-primary text-slate-100 rounded-xl p-1 w-10">
                        14%
                      </div>
                      <div className="relative">
                        <div className="absolute top-1 w-10 text-slate-950">
                          <Lineonnum />
                        </div>
                        <div className="text-slate-400 text-sm">155000</div>
                      </div>
                    </div>

                    <div dir="rtl">
                      <span>125000</span> تومان
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-fit p-5 rounded-xl">
            <div className="ml-0 border-2 rounded-3xl">
              <div className="pr-4 pt-0 mr-0 pb-6">
                <div className="flex justify-end ml-0 mx-auto">
                  <Espesial />
                </div>
                <div className="flex bg-customGray w-fit p-1 rounded-lg gap-2">
                  <div>
                    <Goldstart />
                  </div>
                  <div className="text-xs items-center my-1 pl-2">4.75</div>
                </div>

                <div className="flex mt-5 justify-center mx-auto">
                  <img src="/images/01-3-824x1f024.png" width={100} />
                </div>
                <div className="mt-1 flex items-end text-sm text-slate-700 p-1 text-center">
                  محصول آزمایشی با حدود 2 خط متن یه کم طولانی
                </div>

                <div className="mt-9 flex gap-3">
                  <div
                    className="font-bold justify-start mx-auto ml-2 items-end my-auto"
                    dir="ltr"
                  >
                    <div className="flex items-center my-auto gap-1">
                      <div className="text-center bg-primary text-slate-100 rounded-xl p-1 w-10">
                        14%
                      </div>
                      <div className="relative">
                        <div className="absolute top-1 w-10 text-slate-950">
                          <Lineonnum />
                        </div>
                        <div className="text-slate-400 text-sm">155000</div>
                      </div>
                    </div>

                    <div dir="rtl">
                      <span>125000</span> تومان
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-fit p-5 rounded-xl">
            <div className="ml-0 border-2 rounded-3xl">
              <div className="pr-4 pt-0 mr-0 pb-6">
                <div className="flex justify-end ml-0 mx-auto">
                  <Espesial />
                </div>
                <div className="flex bg-customGray w-fit p-1 rounded-lg gap-2">
                  <div>
                    <Goldstart />
                  </div>
                  <div className="text-xs items-center my-1 pl-2">4.75</div>
                </div>

                <div className="flex mt-5 justify-center mx-auto">
                  <img src="/images/01-3-824x1024.png" width={100} />
                </div>
                <div className="mt-1 flex items-end text-sm text-slate-700 p-1 text-center">
                  محصول آزمایشی با حدود 2 خط متن یه کم طولانی
                </div>

                <div className="mt-9 flex gap-3">
                  <div
                    className="font-bold justify-start mx-auto ml-2 items-end my-auto"
                    dir="ltr"
                  >
                    <div className="flex items-center my-auto gap-1">
                      <div className="text-center bg-primary text-slate-100 rounded-xl p-1 w-10">
                        14%
                      </div>
                      <div className="relative">
                        <div className="absolute top-1 w-10 text-slate-950">
                          <Lineonnum />
                        </div>
                        <div className="text-slate-400 text-sm">155000</div>
                      </div>
                    </div>

                    <div dir="rtl">
                      <span>125000</span> تومان
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-fit p-5 rounded-xl">
            <div className="ml-0 border-2 rounded-3xl">
              <div className="pr-4 pt-0 mr-0 pb-6">
                <div className="flex justify-end ml-0 mx-auto">
                  <Espesial />
                </div>
                <div className="flex bg-customGray w-fit p-1 rounded-lg gap-2">
                  <div>
                    <Goldstart />
                  </div>
                  <div className="text-xs items-center my-1 pl-2">4.75</div>
                </div>

                <div className="flex mt-5 justify-center mx-auto">
                  <img src="/images/01-3-824x1f024.png" width={100} />
                </div>
                <div className="mt-1 flex items-end text-sm text-slate-700 p-1 text-center">
                  محصول آزمایشی با حدود 2 خط متن یه کم طولانی
                </div>

                <div className="mt-9 flex gap-3">
                  <div
                    className="font-bold justify-start mx-auto ml-2 items-end my-auto"
                    dir="ltr"
                  >
                    <div className="flex items-center my-auto gap-1">
                      <div className="text-center bg-primary text-slate-100 rounded-xl p-1 w-10">
                        14%
                      </div>
                      <div className="relative">
                        <div className="absolute top-1 w-10 text-slate-950">
                          <Lineonnum />
                        </div>
                        <div className="text-slate-400 text-sm">155000</div>
                      </div>
                    </div>

                    <div dir="rtl">
                      <span>125000</span> تومان
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-fit p-5 rounded-xl">
            <div className="ml-0 border-2 rounded-3xl">
              <div className="pr-4 pt-0 mr-0 pb-6">
                <div className="flex justify-end ml-0 mx-auto">
                  <Espesial />
                </div>
                <div className="flex bg-customGray w-fit p-1 rounded-lg gap-2">
                  <div>
                    <Goldstart />
                  </div>
                  <div className="text-xs items-center my-1 pl-2">4.75</div>
                </div>

                <div className="flex mt-5 justify-center mx-auto">
                  <img src="/images/01-3-824x1024.png" width={100} />
                </div>
                <div className="mt-1 flex items-end text-sm text-slate-700 p-1 text-center">
                  محصول آزمایشی با حدود 2 خط متن یه کم طولانی
                </div>

                <div className="mt-9 flex gap-3">
                  <div
                    className="font-bold justify-start mx-auto ml-2 items-end my-auto"
                    dir="ltr"
                  >
                    <div className="flex items-center my-auto gap-1">
                      <div className="text-center bg-primary text-slate-100 rounded-xl p-1 w-10">
                        14%
                      </div>
                      <div className="relative">
                        <div className="absolute top-1 w-10 text-slate-950">
                          <Lineonnum />
                        </div>
                        <div className="text-slate-400 text-sm">155000</div>
                      </div>
                    </div>

                    <div dir="rtl">
                      <span>125000</span> تومان
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
