import LongCard from "@/app/components/design/Cards/ProductCard/LongCard";
import MainCard from "@/app/components/design/Cards/ProductCard/MainCard";
import { Golbegi } from "@/app/components/design/Color";
import {
  Addsquare,
  Minussquare,
  Searchicon,
  Sorticon,
} from "@/app/components/design/Icons";
import Numberpaginate from "@/app/components/design/Slider/Numberpaginate";

const Sellerpage = () => {
  return (
    <>
      <div className="container justify-center mx-auto mt-20 mb-64">
        <div className="text-2xl">
          <h1>محصولات فروشگاه تقوی</h1>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-12">
            <div className="col-span-3 p-4">

              <div> {/* برند */}
                <div className="bg-customGray p-4 rounded-2xl grid grid-cols-2">
                  <span className="col-span-1">برندها</span>
                  <span className="col-span-1 flex justify-end">
                    <a href="#"><Minussquare /></a>
                  </span>
                </div>
                <div className="pl-5 overflow-y-scroll max-h-52">
                  <div className="p-4 grid grid-cols-2">
                    <span className="col-span-1">نسپرسو</span>
                    <span className="col-span-1 flex justify-end">
                      <input type="radio" />
                    </span>
                  </div>
                  <div className="p-4 grid grid-cols-2">
                    <span className="col-span-1">برند تست</span>
                    <span className="col-span-1 flex justify-end">
                      <input type="radio" />
                    </span>
                  </div>
                  <div className="p-4 grid grid-cols-2">
                    <span className="col-span-1">برند تست2</span>
                    <span className="col-span-1 flex justify-end">
                      <input type="radio" />
                    </span>
                  </div>
                  <div className="p-4 grid grid-cols-2">
                    <span className="col-span-1">برندتست3</span>
                    <span className="col-span-1 flex justify-end">
                      <input type="radio" />
                    </span>
                  </div>
                  <div className="p-4 grid grid-cols-2">
                    <span className="col-span-1">برند تست4</span>
                    <span className="col-span-1 flex justify-end">
                      <input type="radio" />
                    </span>
                  </div>
                </div>
              </div>

              <div> {/* قیمت */}
                <div className="bg-customGray p-4 mt-5 rounded-2xl grid grid-cols-2">
                  <span className="col-span-1">قیمت</span>
                  <span className="col-span-1 flex justify-end">
                    <a href="#"><Addsquare /></a>
                  </span>
                </div>
                <div className="mt-4 pr-4 pl-4">
                  <form action="#">
                    <div className="grid grid-cols-2 text-sm gap-1">
                      <div className="flex gap-1 justify-start">
                        <span className="text-slate-500">از</span>
                        <span className="text-primary">
                          {Number(2550000).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-1 justify-end">
                        <span className="text-slate-500">تا</span>
                        <span className="text-primary">
                          {Number(2580000).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <input
                      dir="ltr"
                      className="w-full"
                      type="range"
                      min="2550000"
                      max="2850000"
                    ></input>
                    <div className="grid grid-cols-2 text-xs text-slate-500">
                      <div className="flex justify-start">ارزان ترین</div>
                      <div className="flex justify-end">گران ترین</div>
                    </div>
                  </form>
                </div>
              </div>

              <div> {/* توان مضرفی */}
                <div className="bg-customGray p-4 mt-5 rounded-2xl grid grid-cols-2">
                  <span className="col-span-1">توان مصرفی</span>
                  <span className="col-span-1 flex justify-end">
                    <a href="#"><Addsquare /></a>
                  </span>
                </div>
              </div>

              <div> {/* رنگ */}
                <div className="mt-5">
                  <div className="bg-customGray p-4  grid grid-cols-2 rounded-2xl">
                    <span className="col-span-1">رنگ</span>
                    <span className="col-span-1 flex justify-end">
                      <a href="#"><Addsquare /></a>
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="bg-customGray p-2 rounded-2xl flex gap-1">
                      <div className="items-center my-auto"><Searchicon/></div>
                      <div><input className="items-center my-auto border-none focus:outline-none bg-transparent text-gray-700 px-3 py-2 placeholder-gray-500" type="text" placeholder="جستجو" /></div>
                    </div>       
                  </div>



                  <div className="grid grid-cols-4 pr-5 mt-3">
                      <div className="col-span-3 flex gap-2 items-center my-auto">
                        <span className="w-7 h-7 bg-purple-600 rounded-lg"></span>
                        <span>lieln آمریکا</span>
                      </div>
                      <div className="col-span-1 flex items-center my-auto justify-end">
                        <input className="flex justify-end mx-auto" type="radio" />
                      </div>
                  </div>
                  <div className="grid grid-cols-4 pr-5 mt-3">
                      <div className="col-span-3 flex gap-2 items-center my-auto">
                        <span className="w-7 h-7 bg-purple-300 rounded-lg"></span>
                        <span>گلبهی استرالیا</span>
                      </div>
                      <div className="col-span-1 flex items-center my-auto justify-end">
                        <input className="flex justify-end mx-auto" type="radio" />
                      </div>
                  </div>
                  <div className="grid grid-cols-4 pr-5 mt-3">
                      <div className="col-span-3 flex gap-2 items-center my-auto">
                        <span className="w-7 h-7 bg-purple-600 rounded-lg"></span>
                        <span>lieln آلمان</span>
                      </div>
                      <div className="col-span-1 flex items-center my-auto justify-end">
                        <input className="flex justify-end mx-auto" type="radio" />
                      </div>
                  </div>
                  <div className="grid grid-cols-4 pr-5 mt-3">
                      <div className="col-span-3 flex gap-2 items-center my-auto">
                        <span className="w-7 h-7 bg-purple-300 rounded-lg"></span>
                        <span>Calina ایران </span>
                      </div>
                      <div className="col-span-1 flex items-center my-auto justify-end">
                        <input className="flex justify-end mx-auto" type="radio" />
                      </div>
                  </div>
                  <div className="grid grid-cols-4 pr-5 mt-3">
                      <div className="col-span-3 flex gap-2 items-center my-auto">
                        <span className="w-7 h-7 bg-purple-600 rounded-lg"></span>
                        <span>lieln آمریکا</span>
                      </div>
                      <div className="col-span-1 flex items-center my-auto justify-end">
                        <input className="flex justify-end mx-auto" type="radio" />
                      </div>
                  </div>
                  <div className="grid grid-cols-4 pr-5 mt-3">
                      <div className="col-span-3 flex gap-2 items-center my-auto">
                        <span className="w-7 h-7 bg-purple-300 rounded-lg"></span>
                        <span>lieln سوئد</span>
                      </div>
                      <div className="col-span-1 flex items-center my-auto justify-end">
                        <input className="flex justify-end mx-auto" type="radio" />
                      </div>
                  </div>
                </div>
               
                <div className=""> {/* فیلترهای کلی */}
                  <div className="bg-customGray p-4 mt-5 rounded-2xl grid grid-cols-2">
                    <span className="col-span-1">فیلترهای کلی</span>
                  </div>
                  <div className="grid grid-cols-2 p-4 pt-0 mt-4 justify-center mx-auto">
                    <div className="col-span-1">فقط کالاهای موجود</div>
                    <div className="col-span-1 justify-end mx-auto"><input type="radio" /></div>
                  </div>
                  <div className="grid grid-cols-2 p-4 pt-0 mt-4 justify-center mx-auto">
                    <div className="col-span-1">آپشن تستی</div>
                    <div className="col-span-1 justify-end mx-auto"><input type="radio" /></div>
                  </div>
                </div>

              </div>





            </div>
            <div className="col-span-9 p-4">
              <div>
                <div className="p-2 grid grid-cols-4">
                  <div className="flex gap-2 col-span-3">
                    <span className="items-center flex">
                      <Sorticon />
                    </span>
                    <span className="text-primary items-center flex">
                      مرتب سازی بر اساس
                    </span>
                    <div className="flex gap-4 text-xs items-center font-normal text-slate-500 mr-5">
                      <span>
                        <a href="#">گران ترین</a>
                      </span>
                      <span className="bg-primary p-2 rounded-2xl text-white">
                        <a href="#">ارزان ترین</a>
                      </span>
                      <span>
                        <a href="#">پرفروش</a>
                      </span>
                      <span>
                        <a href="#">محبوبیت</a>
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1 items-center flex justify-end">
                    <div className="text-xs text-slate-500">192236 کالا</div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-4 p-3 mt-5 gap-2">
                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>
                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>
                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>
                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>

                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>
                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>
                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>
                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>

                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>
                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>
                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>
                    <div className="col-span-1">
                      <MainCard></MainCard>
                    </div>
                  </div>
                </div>
                <div>
                  <Numberpaginate></Numberpaginate>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sellerpage;
