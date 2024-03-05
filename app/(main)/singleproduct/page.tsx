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

const SingleProduct = () => {
  return (
    <>
      <Breadcrumb></Breadcrumb>
      <div className="container justify-center mx-auto mt-3 flex gap-8">
        <div className="box-border w-96 h-5/6 border-2 rounded-lg">
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
        </div>

        {/* next div */}
        <div className="box-border w-96 ml-0 h-5/6 border-2 rounded-lg">
          <div className="p-3 pr-9 pt-0 mr-0 pb-6"></div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
