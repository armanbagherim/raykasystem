import { Minussquare } from "@/app/components/design/Icons";

const Sellerpage = () => {
  return (
    <>
      <div className="container justify-center mx-auto mt-20">
        <div className="text-2xl">
          <h1>محصولات فروشگاه تقوی</h1>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-12">
            <div className="col-span-3 p-4">
              <div>
                <div className="bg-customGray p-4 rounded-2xl grid grid-cols-2">
                  <span className="col-span-1">برندها</span>
                  <span className="col-span-1 flex justify-end">
                    <Minussquare />
                  </span>
                </div>
                <div className="pl-5 overflow-y-scroll max-h-52">
                  <div className="p-4 grid grid-cols-2">
                    <span className="col-span-1">نسپرسو</span>
                    <span className="col-span-1 flex justify-end"><input type="radio" /></span>
                  </div>
                  <div className="p-4 grid grid-cols-2">
                    <span className="col-span-1">برند تست</span>
                    <span className="col-span-1 flex justify-end"><input type="radio" /></span>
                  </div>
                  <div className="p-4 grid grid-cols-2">
                    <span className="col-span-1">برند تست2</span>
                    <span className="col-span-1 flex justify-end"><input type="radio" /></span>
                  </div>
                  <div className="p-4 grid grid-cols-2">
                    <span className="col-span-1">برندتست3</span>
                    <span className="col-span-1 flex justify-end"><input type="radio" /></span>
                  </div>
                  <div className="p-4 grid grid-cols-2">
                    <span className="col-span-1">برند تست4</span>
                    <span className="col-span-1 flex justify-end"><input type="radio" /></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-9 p-4">bbb</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sellerpage;
