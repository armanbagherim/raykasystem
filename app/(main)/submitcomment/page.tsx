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
          <div className="col-span-2 border border-2 rounded rounded-3xl p-5">
            <div className="text-xs grid grid-cols-2">
              <div className="col-span-1">قیمت و ارزش خرید</div>
              <div className="col-span-1 justify-end flex" dir="ltr">
                <form>
                  <input type="range" min="1" max="5" step="1" />
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5"></div>
        </div>
      </div>
    </>
  );
};

export default Submitcomment;
