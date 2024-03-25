import LongCard from "@/app/components/design/Cards/ProductCard/LongCard";
import MainCard from "@/app/components/design/Cards/ProductCard/MainCard";

import {
  Addsquare,
  Minussquare,
  Searchicon,
  Sorticon,
} from "@/app/components/design/Icons";
import Numberpaginate from "@/app/components/design/Slider/Numberpaginate";
import Sidebar from "../components/Sidebar";

const Productfilter = () => {
  return (
    <>
      <div className="container justify-center mx-auto mt-20 mb-64">
        <div className="mt-7">
          <div className="grid grid-cols-12">
            <Sidebar />
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

export default Productfilter;
