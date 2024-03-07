import Breadcrumb from "@/app/components/design/Breadcrumb";
import product from "../../../public/images/product-1.png";
import { url } from "inspector";
import Zoomin from "@/app/components/design/Icons/Zoom-in";
import Heartadd from "@/app/components/design/Icons/Heart-add";
import Play from "@/app/components/design/Icons/Play";
import Link from "next/link";
import Goldstart from "@/app/components/design/Icons/Goldstar";
import Category2 from "@/app/components/design/Icons/Category2";
import Smallcat from "@/app/components/design/Icons/Smallcat";
import Redicon from "@/app/components/design/Icons/colorIcons/Redicon";
import Blueicon from "@/app/components/design/Icons/colorIcons/Blueicon";
import Greenicon from "@/app/components/design/Icons/colorIcons/Greenicon";
import Toogle from "@/app/components/design/Icons/Toogle";
import Espesial from "@/app/components/design/Icons/Espesial";
import Tickstar from "@/app/components/design/Icons/Tickstar";
import Exclamation from "@/app/components/design/Icons/Exclamation";
import Exclamationitalic from "@/app/components/design/Icons/Exclamationitalic";
import Trucktick from "@/app/components/design/Icons/Trucktick";
import Locationicon from "@/app/components/design/Icons/Location";
import Lineonnum from "@/app/components/design/Icons/Lineonnum";
import Cart from "@/app/components/design/Icons/Cart";
import Infocircle from "@/app/components/design/Icons/Infocircle";
import Tickcircle from "@/app/components/design/Icons/Tickcircle";
import Tickstarwhite from "@/app/components/design/Icons/Tickstarwhite";
import Exclamationreport from "@/app/components/design/Icons/Exclamationreport";
import Like from "@/app/components/design/Icons/Like";
import Unlike from "@/app/components/design/Icons/Unlike";
import Backtitle from "@/app/components/design/Icons/Backtitle";

const SingleProduct = () => {
  return (
    <>
      <Breadcrumb></Breadcrumb>
      <div className="container justify-center mx-auto mt-3 flex gap-8">
        <div className="box-border w-96 h-5/6 border-0 rounded-lg">
          <div className="box-border w-10 h-32 mt-4 mr-3 rounded-3xl bg-slate-200">
            <div className="pt-3.5 mr-3">
              <Link href="#">
                <Zoomin></Zoomin>
              </Link>
            </div>
            <div className="pt-5 mr-3">
              <Link href="#">
                <Heartadd></Heartadd>
              </Link>
            </div>
            <div className="pt-5 mr-3">
              <Link href="#">
                <Play></Play>
              </Link>
            </div>
          </div>
          <div className="p-3 pr-9 pt-0 mr-0 pb-6">
            <img src="/images/product-1.png" width="250" />
          </div>
        </div>

        <div className="box-border w-1/2 h-5/6 rounded-lg">
          <div className="text-center font-normal text-base text-slate-500">
            اتو بخار فیلیپس مدل 7040 (2800 وات)
          </div>
          <div className="text-center font-normal text-sm mt-2 text-slate-400">
            Huda beauty fauxfilter foundation
          </div>

          <div>
            <div className="flex gap-4 justify-center mx-auto">
              <div className="mt-5 w-60 h-10 bg-slate-200 rounded-2xl">
                <div className="pt-2.5 mr-3 flex gap-2 text-slate-500">
                  <div className="pt-0.5">
                    <Goldstart></Goldstart>
                  </div>
                  <div>4.75 از 4240 نظر</div>
                </div>
              </div>
              <div className="mt-5 w-2/3 h-10 bg-slate-200 rounded-2xl">
                <div className="pt-2.5 mr-3 flex gap-2 text-slate-500">
                  <div className="pt-1">
                    <Category2></Category2>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-bold">برند: </div>
                    <div>تارورس</div>
                  </div>
                  <div className="justify-start mx-auto ml-2">
                    <div className="pt-0.5 justify-center flex mx-auto w-12 bg-slate-50 rounded-xl">
                      <Smallcat></Smallcat>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 w-auto h-10 bg-slate-200 rounded-2xl">
              <div className="pt-2.5 mr-3 flex gap-2 text-slate-500">
                <div className="pt-0.5">
                  <Category2></Category2>
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
              <div>
                <Redicon></Redicon>
              </div>
              <div>قرمز</div>
            </div>
            <div className="flex items-center my-auto gap-2">
              <div>
                <Blueicon></Blueicon>
              </div>
              <div>آبی</div>
            </div>
            <div className="flex items-center my-auto gap-2">
              <div>
                <Greenicon></Greenicon>
              </div>
              <div>سبز</div>
            </div>
          </div>

          <div className="mt-10 justify-center mx-auto p-5 flex gap-72">
            <ul className="list-disc text-lg">
              <li className="text-slate-800">مورد کوتاه 1</li>
              <li className="text-slate-600">مورد کوتاه 2</li>
              <li className="text-slate-500">مورد کوتاه بلندتر 1</li>
              <li className="text-slate-400">مورد کوتاه بلندتر 2</li>
              <li className="text-slate-300">مورد کوتاه بلندتر 3</li>
            </ul>
            <ul className="list-disc text-lg">
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
              <Toogle></Toogle>
            </div>
          </div>
        </div>

        {/* 
        <div className="box-border w-1/2 h-5/6 rounded-lg">
          <div className="text-center font-normal text-base text-slate-500"> */}

        <div className="box-border w-96 ml-0 h-5/6 border-2 rounded-3xl bg-slate-200">
          <div className="pr-4 pt-0 mr-0 pb-6">
            <div className="flex justify-end ml-0 mx-auto">
              <Espesial></Espesial>
            </div>
            <div className="text-green-600">چرا از جهیزان خرید کنم؟</div>
            <div className="mt-5">
              <div className="flex gap-1 mt-3">
                <div>
                  <Tickstar></Tickstar>
                </div>
                <div>
                  گارانتی{" "}
                  <span className="font-bold text-green-600">
                    12 ماهه مادیران
                  </span>
                </div>
                <div className="my-auto justify-start mx-auto ml-4">
                  <Exclamation></Exclamation>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <div>
                  <Exclamationitalic></Exclamationitalic>
                </div>
                <div>
                  امکان خرید در{" "}
                  <span className="font-bold text-green-600">4 قسط</span>
                </div>
                <div className="my-auto justify-start mx-auto ml-4">
                  <Exclamation></Exclamation>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <div>
                  <Trucktick></Trucktick>
                </div>
                <div>
                  ارسال تا <span className="font-bold text-green-600">3</span>{" "}
                  روز آینده
                </div>
                <div className="my-auto justify-start mx-auto ml-4">
                  <Exclamation></Exclamation>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <div>
                  <Locationicon></Locationicon>
                </div>
                <div>
                  گارانتی{" "}
                  <span className="font-bold text-green-600">
                    12 ماهه مادیران
                  </span>
                </div>
                <div className="my-auto justify-start mx-auto ml-4">
                  <Exclamation></Exclamation>
                </div>
              </div>
            </div>
            <div className="mt-20 flex items-end">
              <div className="pb-0.5">
                فروشنده:{" "}
                <span className="font-bold text-green-600">جهیزان</span>
              </div>
              <div
                className="font-bold justify-start mx-auto ml-2 items-end my-auto"
                dir="ltr"
              >
                <div className="text-center bg-slate-300 text-green-500 rounded-ss-xl rounded-e-xl p-1">
                  قیمت نقدی
                </div>
                <div dir="rtl">125000 تومان</div>
              </div>
            </div>

            <div className="mt-9 flex gap-3">
              <div>
                <div className="bg-green-700 text-slate-100 font-bold text-xl p-1 w-9 rounded-lg text-center items-center">
                  23
                </div>
                <div>ثانیه</div>
              </div>
              <div>
                <div className="bg-green-700 text-slate-100 font-bold text-xl p-1 w-9 rounded-lg text-center items-center">
                  23
                </div>
                <div>دقیقه</div>
              </div>
              <div>
                <div className="bg-green-700 text-slate-100 font-bold text-xl p-1 w-9 rounded-lg text-center items-center">
                  23
                </div>
                <div>ساعت</div>
              </div>
              <div
                className="font-bold justify-start mx-auto ml-2 items-end my-auto"
                dir="ltr"
              >
                <div className="flex items-center my-auto gap-1">
                  <div className="text-center bg-green-700 text-slate-100 rounded-xl p-1 w-10">
                    14%
                  </div>
                  <div className="relative">
                    <div className="absolute top-1 w-10 text-slate-950">
                      <Lineonnum></Lineonnum>
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
          <div className="text-center mx-auto">
            <button className="bg-green-700 text-slate-100 p-5 m-5 rounded-2xl">
              <div className="flex gap-3">
                <div>
                  <Cart></Cart>
                </div>
                <div>افزودن به سبد خرید</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-5 gap-10 bg-slate-200 rounded-3xl p-5">
        <div className="font-bold">فروشندگان این رنگ</div>

        <div className="mt-5 text-xl">
          <div className="bg-slate-100 flex rounded-xl p-2 gap-14 items-center">
            <div className="text-green-700">پردازش گستر برتر خلیج فارس</div>
            <div>گارانتی 18 ماهه مادیران</div>
            <div className="bg-blue-200 p-4 rounded-3xl">
              ارسال فقط به شهر تهران
            </div>
            <div className="flex gap-10 text-center mx-auto ml-1">
              <div className="items-center my-auto">125000 تومان</div>
              <button className="bg-green-700 text-slate-100 p-3 text-sm rounded-2xl items-center my-auto">
                <div className="flex gap-3">
                  <div>
                    <Cart></Cart>
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
          <div className="bg-slate-100 flex rounded-xl p-2 gap-14 items-center">
            <div className="text-green-700">پردازش گستر برتر خلیج فارس</div>
            <div>گارانتی 18 ماهه مادیران</div>
            {/* <div className="bg-blue-200 p-4 rounded-3xl">
              ارسال فقط به شهر تهران
            </div> */}
            <div className="flex gap-10 text-center mx-auto ml-1">
              <div className="items-center my-auto">125000 تومان</div>
              <button className="bg-green-700 text-slate-100 p-3 text-sm rounded-2xl items-center my-auto">
                <div className="flex gap-3">
                  <div>
                    <Cart></Cart>
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
          <div className="bg-slate-100 flex rounded-xl p-2 gap-14 items-center">
            <div className="text-green-700">پردازش گستر برتر خلیج فارس</div>
            <div>گارانتی 18 ماهه مادیران</div>
            <div className="bg-blue-200 p-4 rounded-3xl">
              ارسال فقط به شهر تهران
            </div>
            <div className="flex gap-10 text-center mx-auto ml-1">
              <div className="items-center my-auto">125000 تومان</div>
              <button className="bg-green-700 text-slate-100 p-3 text-sm rounded-2xl items-center my-auto">
                <div className="flex gap-3">
                  <div>
                    <Cart></Cart>
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

      <div className="container mx-auto mt-5 gap-10 box-border border-2 shadow-md rounded-3xl p-5 flex">
        <div className="mr-3 text-green-700">نقد و بررسی محصول</div>
        <div>مشخصات محصول</div>
        <div>نظرات</div>
      </div>

      <div className="container mx-auto mt-5 box-border border-2 shadow-md rounded-3xl p-8 w-auto">
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

      <div className="container mx-auto mt-8 gap-10 box-border border-2 shadow-md rounded-3xl p-8 pb-60">
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
                <Infocircle></Infocircle>
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
              <Tickcircle></Tickcircle>
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
                <Infocircle></Infocircle>
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
              <Tickcircle></Tickcircle>
            </div>
          </div>
          <hr />
        </div>
      </div>

      <div className="container mx-auto mt-8 gap-10 box-border border-2 shadow-md rounded-3xl p-8">
        <div className="w-full">امتیاز و دیدگاه کاربران</div>
        <div className="mt-8 flex gap-5">
          <div className="box-border border-0 rounded-xl p-3 w-96">
            <div className="flex gap-6">
              <div className="p-4  bg-slate-100 rounded-xl">
                <div className="flex gap-1">
                  <div className="items-center my-auto">
                    <Goldstart></Goldstart>
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
                  <button className="box-border border-2 border-green-700 text-green-700 p-3 text-sm rounded-2xl items-center my-auto w-full">
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
                <div className="relative w-full h-3 bg-slate-300 rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "80%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "40%" }}
                    ></div>
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
                <div className="relative w-full h-3 bg-slate-300 rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "70%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "40%" }}
                    ></div>
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
                <div className="relative w-full h-3 bg-slate-300 rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "60%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "60%" }}
                    ></div>
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
                <div className="relative w-full h-3 bg-slate-300 rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "40%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "90%" }}
                    ></div>
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
                <div className="relative w-full h-3 bg-slate-300 rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "80%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "40%" }}
                    ></div>
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
                <div className="relative w-full h-3 bg-slate-300 rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "90%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="box-border border-0 w-full rounded-xl mt-5">
              <div className="box-border border-2 w-full rounded-xl m-2 p-3">
                <div className="flex gap-4">
                  <div className="text-md items-center my-auto">
                    آرمان باقری
                  </div>
                  <span className="items-center my-auto">|</span>
                  <div className="text-md items-center my-auto">
                    22 بهمن 1402{" "}
                  </div>
                  <div className="flex gap-3 bg-green-600 w-fit p-3 rounded-xl text-slate-100">
                    <div>
                      <Tickstarwhite></Tickstarwhite>
                    </div>
                    <div>خریدار رنگ کرمی قرمز</div>
                  </div>
                  <div className="flex gap-1 items-center my-auto justify-start mx-auto ml-2">
                    <div>
                      <Exclamationreport></Exclamationreport>
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
                      <Like></Like>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">12</div>
                    <div className="text-xs items-center my-auto">
                      <Unlike></Unlike>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="box-border border-0 w-full rounded-xl mt-5">
              <div className="box-border border-2 w-full rounded-xl m-2 p-3">
                <div className="flex gap-4">
                  <div className="text-md items-center my-auto">
                    آرمان باقری
                  </div>
                  <span className="items-center my-auto">|</span>
                  <div className="text-md items-center my-auto">
                    22 بهمن 1402{" "}
                  </div>
                  <div className="flex gap-3 bg-green-600 w-fit p-3 rounded-xl text-slate-100">
                    <div>
                      <Tickstarwhite></Tickstarwhite>
                    </div>
                    <div>خریدار رنگ کرمی قرمز</div>
                  </div>
                  <div className="flex gap-1 items-center my-auto justify-start mx-auto ml-2">
                    <div>
                      <Exclamationreport></Exclamationreport>
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
                      <Like></Like>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">12</div>
                    <div className="text-xs items-center my-auto">
                      <Unlike></Unlike>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="box-border border-0 w-full rounded-xl mt-5">
              <div className="box-border border-2 w-full rounded-xl m-2 p-3">
                <div className="flex gap-4">
                  <div className="text-md items-center my-auto">
                    آرمان باقری
                  </div>
                  <span className="items-center my-auto">|</span>
                  <div className="text-md items-center my-auto">
                    22 بهمن 1402{" "}
                  </div>
                  <div className="flex gap-3 bg-green-600 w-fit p-3 rounded-xl text-slate-100">
                    <div>
                      <Tickstarwhite></Tickstarwhite>
                    </div>
                    <div>خریدار رنگ کرمی قرمز</div>
                  </div>
                  <div className="flex gap-1 items-center my-auto justify-start mx-auto ml-2">
                    <div>
                      <Exclamationreport></Exclamationreport>
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
                      <Like></Like>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">12</div>
                    <div className="text-xs items-center my-auto">
                      <Unlike></Unlike>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-3 justify-start mx-auto gap-2" dir="ltr">
          <div>
            <button className="bg-slate-400 p-3 pl-5 pr-5 rounded-lg hover:bg-slate-600">
              1
            </button>
          </div>
          <div>
            <button className="bg-slate-400 p-3 pl-5 pr-5 rounded-lg hover:bg-slate-600">
              2
            </button>
          </div>
          <div>
            <button className="bg-green-600 p-3 pl-5 pr-5 rounded-lg hover:bg-slate-600">
              3
            </button>
          </div>
        </div>
      </div>
      <div className="relative container mx-auto mt-8 gap-10 box-border border-2 shadow-md rounded-3xl p-8">
        <div className="flex pb-5 relative">
          <div className="absolute">
            <Backtitle></Backtitle>
          </div>
          <div className="font-bold text-2xl items-center p-3 text-green-600">
            محصولات مرتبط
          </div>
        </div>

        <div className="p-3 flex">
          <div className="box-border w-fit p-5 rounded-xl">
            <div className="box-border ml-0 border-2 rounded-3xl">
              <div className="pr-4 pt-0 mr-0 pb-6">
                <div className="flex justify-end ml-0 mx-auto">
                  <Espesial></Espesial>
                </div>
                <div className="flex bg-slate-300 w-fit p-1 rounded-lg gap-2">
                  <div>
                    <Goldstart></Goldstart>
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
                      <div className="text-center bg-green-700 text-slate-100 rounded-xl p-1 w-10">
                        14%
                      </div>
                      <div className="relative">
                        <div className="absolute top-1 w-10 text-slate-950">
                          <Lineonnum></Lineonnum>
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
          <div className="box-border w-fit p-5 rounded-xl">
            <div className="box-border ml-0 border-2 rounded-3xl">
              <div className="pr-4 pt-0 mr-0 pb-6">
                <div className="flex justify-end ml-0 mx-auto">
                  <Espesial></Espesial>
                </div>
                <div className="flex bg-slate-300 w-fit p-1 rounded-lg gap-2">
                  <div>
                    <Goldstart></Goldstart>
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
                      <div className="text-center bg-green-700 text-slate-100 rounded-xl p-1 w-10">
                        14%
                      </div>
                      <div className="relative">
                        <div className="absolute top-1 w-10 text-slate-950">
                          <Lineonnum></Lineonnum>
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
          <div className="box-border w-fit p-5 rounded-xl">
            <div className="box-border ml-0 border-2 rounded-3xl">
              <div className="pr-4 pt-0 mr-0 pb-6">
                <div className="flex justify-end ml-0 mx-auto">
                  <Espesial></Espesial>
                </div>
                <div className="flex bg-slate-300 w-fit p-1 rounded-lg gap-2">
                  <div>
                    <Goldstart></Goldstart>
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
                      <div className="text-center bg-green-700 text-slate-100 rounded-xl p-1 w-10">
                        14%
                      </div>
                      <div className="relative">
                        <div className="absolute top-1 w-10 text-slate-950">
                          <Lineonnum></Lineonnum>
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
          <div className="box-border w-fit p-5 rounded-xl">
            <div className="box-border ml-0 border-2 rounded-3xl">
              <div className="pr-4 pt-0 mr-0 pb-6">
                <div className="flex justify-end ml-0 mx-auto">
                  <Espesial></Espesial>
                </div>
                <div className="flex bg-slate-300 w-fit p-1 rounded-lg gap-2">
                  <div>
                    <Goldstart></Goldstart>
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
                      <div className="text-center bg-green-700 text-slate-100 rounded-xl p-1 w-10">
                        14%
                      </div>
                      <div className="relative">
                        <div className="absolute top-1 w-10 text-slate-950">
                          <Lineonnum></Lineonnum>
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
          <div className="box-border w-fit p-5 rounded-xl">
            <div className="box-border ml-0 border-2 rounded-3xl">
              <div className="pr-4 pt-0 mr-0 pb-6">
                <div className="flex justify-end ml-0 mx-auto">
                  <Espesial></Espesial>
                </div>
                <div className="flex bg-slate-300 w-fit p-1 rounded-lg gap-2">
                  <div>
                    <Goldstart></Goldstart>
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
                      <div className="text-center bg-green-700 text-slate-100 rounded-xl p-1 w-10">
                        14%
                      </div>
                      <div className="relative">
                        <div className="absolute top-1 w-10 text-slate-950">
                          <Lineonnum></Lineonnum>
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
