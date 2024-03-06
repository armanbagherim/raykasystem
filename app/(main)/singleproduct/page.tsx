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
import Linearverify from "@/app/components/design/Icons/linearverify";
import Exclamation from "@/app/components/design/Icons/Exclamation";
import Exclamationitalic from "@/app/components/design/Icons/Exclamationitalic";
import Trucktick from "@/app/components/design/Icons/Trucktick";
import Locationicon from "@/app/components/design/Icons/Location";
import Lineonnum from "@/app/components/design/Icons/Lineonnum";
import Cart from "@/app/components/design/Icons/Cart";

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
                  <Linearverify></Linearverify>
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
        <div>فروشندگان این رنگ</div>

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
    </>
  );
};

export default SingleProduct;
