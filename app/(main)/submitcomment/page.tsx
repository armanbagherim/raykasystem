import MainCard from "@/app/components/design/Cards/ProductCard/MainCard";
import { Leftarrow } from "@/app/components/design/Icons";

const Submitcomment = () => {
  return (
    <>
      <div className="container justify-center mx-auto mt-20 mb-64">
        <div className="grid grid-cols-3">
          <div className="flex gap-3 col-span-2">
            <div>
              <img src="/images/product-1.png" alt="" />
            </div>
            <div className="items-center my-auto text-slate-500 text-lg">
              ثبت نظر و امتیاز به محصول اتو بخار فیلیپس مدل 7040 (2800 وات)
            </div>
          </div>
          <div className="flex col-span-1 justify-end">
            <span className="items-center my-auto text-slate-500 text-sm">
              انصراف
            </span>
            <span className="items-center my-auto">
              <Leftarrow />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-7 mt-7">
          <div className="col-span-2 border border-2 rounded rounded-3xl p-6">
            <div className="text-xs grid grid-cols-2 mb-9">
              <div className="col-span-1">قیمت و ارزش خرید</div>
              <div className="col-span-1" dir="ltr">
                <form>
                  <input type="range" min="1" max="5" step="1" />
                </form>
              </div>
            </div>
            <div className="text-xs grid grid-cols-2 mb-9">
              <div className="col-span-1">کیفیت محصول</div>
              <div className="col-span-1" dir="ltr">
                <form>
                  <input type="range" min="1" max="5" step="1" />
                </form>
              </div>
            </div>
            <div className="text-xs grid grid-cols-2 mb-9">
              <div className="col-span-1">متریال</div>
              <div className="col-span-1" dir="ltr">
                <form>
                  <input type="range" min="1" max="5" step="1" />
                </form>
              </div>
            </div>
            <div className="text-xs grid grid-cols-2 mb-9">
              <div className="col-span-1">شباهت یا مغایرت</div>
              <div className="col-span-1" dir="ltr">
                <form>
                  <input type="range" min="1" max="5" step="1" />
                </form>
              </div>
            </div>
            <div className="text-xs grid grid-cols-2 mb-3">
              <div className="col-span-1">عمر مفید</div>
              <div className="col-span-1" dir="ltr">
                <form>
                  <input type="range" min="1" max="5" step="1" />
                </form>
              </div>
            </div>
          </div>
            <div className="col-span-5">
              <form>
                <div className="grid grid-cols-2 pr-5">
                  <div className="col-span-1 text-sm">آرمان باقری | 22 بهمن 1402</div>
                  <div className="col-span-1 justify-end flex mb-5">
                      <div className="flex gap-2 justify-end">
                        <input type="checkbox" />
                        <div className="text-xs text-slate-500">دیدگاهم را به صورت ناشناس منتشر کن</div>
                      </div>
                  </div>
                  <div className="col-span-2">
                    <textarea className="bg-customGray w-full text-xs p-4 rounded rounded-3xl" placeholder="دیدگاه خود را بنویسید" rows="12"></textarea>
                  </div>
                  <div className="col-span-2 justify-end flex">
                    <button className="border border-primary text-primary w-40 rounded rounded-2xl pt-3 pb-3 pr-7 pl-7">ثبت نظر</button>
                  </div>
                </div>
              </form>
            </div>
        </div>
      </div>
    </>
  );
};

export default Submitcomment;
