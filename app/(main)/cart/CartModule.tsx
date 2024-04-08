"use client";
import {
  Minus,
  PlusBig,
  PlusSmall,
  SnapPay,
  Trash,
  Walet,
  ZarinPal,
} from "@/app/components/design/Icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MapComponent from "@/app/components/global/Map";
import MapComponentClient from "@/app/components/global/MapClient";

const CartModule = ({ cartItems, session, addresses }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [cordinates, setCoordinates] = useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="container justify-center mx-auto">
        <div className="grid  gap-4 grid-cols-1 md:grid-cols-3">
          <div className="col-span-2">
            <div className="grid grid-cols-5 gap-2 text-[12px] font-bold p-2">
              <div className="p-1">محصول</div>
              <div className="p-1">تعداد</div>
              <div className="p-1">قیمت محصول</div>
              <div className="p-1">فروشنده</div>
              <div className="p-1">جمع کل</div>
            </div>
            {cartItems?.result.map((value, index) => (
              <div
                key={value.productId}
                className="grid grid-cols-5 shadow-md bg-white text-xs rounded-3xl mt-2 p-4 items-center"
              >
                <div className="flex">
                  <div>
                    <img src="/images/product-2.png" />
                  </div>
                  <div className="p-1 gap-1">
                    <span></span>
                    <span>{value.product.title}</span>
                    <span>&nbsp;</span>
                    <Link className="text-primary" href="#">
                      {value.product.inventories[0].color.name}
                    </Link>
                  </div>
                </div>

                <div className="p-1 flex gap-1">
                  <div>
                    <PlusBig />
                  </div>
                  <div className="font-bold items-center my-auto">
                    {value.qty}
                  </div>
                  <div>
                    <Minus />
                  </div>
                </div>
                <div className="p-1">
                  <span className="block">
                    <span
                      suppressHydrationWarning
                      className="opacity-75 text-xs line-through"
                    >
                      {Number(125000).toLocaleString()}
                    </span>
                  </span>
                  <p suppressHydrationWarning className="text-sm">
                    {Number(125000).toLocaleString()} تومان
                  </p>
                </div>
                <div className="p-1">
                  <Link className="text-primary" href="#">
                    {value.product.inventories[0].vendor.name}
                  </Link>
                </div>
                <div suppressHydrationWarning className="p-1 text-sm">
                  {Number(125000).toLocaleString()} تومان
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-1 shadow-md border border-customGray bg-white text-xs rounded-3xl mt-8 p-4 pb-10">
            <div className="text-sm mt-4">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="mb-2">نام</div>
                  <input
                    className="bg-[#F8F8F8] w-full text-gray-700 rounded rounded-2xl py-4 px-4 mb-3 focus:outline-none"
                    type="text"
                    value="مهراد"
                    disabled
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2">نام خانوادگی</div>
                  <input
                    className="bg-[#F8F8F8] w-full text-gray-700 rounded rounded-2xl py-4 px-4 mb-3 focus:outline-none"
                    type="text"
                    value="مهراد"
                    disabled
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col-span-1">انتخاب آدرس</div>
                <button
                  variant="outlined"
                  onClick={handleClickOpen}
                  className="col-span-1 flex gap-2 justify-end"
                >
                  <span>
                    <PlusSmall />
                  </span>
                  <span>افزودن آدرس</span>
                </button>

                <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  maxWidth="xl"
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    ثبت آدرس جدید
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <MapComponentClient
                        coordinates={cordinates}
                        setCoordinates={setCoordinates}
                      />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      Disagree
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
                <div className="inline-block col-span-2 rounded-2xl relative w-full mt-4 bg-customGray">
                  <div className="">
                    <div className="pointer-events-none justify-center mx-auto w-10 absolute inset-y-0 left-0 flex items-center text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>

                    <select className="appearance-none text-sm h-[63px] w-full rounded-2xl bg-customGray hover:border-gray-500 pr-4 shadow focus:outline-none focus:shadow-outline">
                      {session?.result ? (
                        addresses.result.map((value, key) => {
                          return (
                            <option key={key} value={value.id}>
                              {value.name} | {value.address}
                            </option>
                          );
                        })
                      ) : (
                        <option>آدرسی جهت نمایش پیدا نشد</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-4 relative">
                <input
                  className="text-sm bg-customGray p-4 w-full rounded-xl outline-none"
                  type="text"
                  placeholder="کد تخفیف"
                />
                <button className="bg-primary absolute left-2 top-2 hover:bg-green-700 p-2 pl-3 pr-3 rounded-xl text-white">
                  بررسی کد
                </button>
              </div>

              <div className="mt-5 text-sm">روش پرداخت</div>

              <div className="grid grid-cols-2 mt-3 gap-2">
                {/* <div className="col-span-2 flex gap-2 my-auto bg-customGray p-3 rounded-xl">
                  <div className="items-center my-auto">
                    <SnapPay />
                  </div>
                  <div className="-mt-1">
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="col-span-2">
                      <div className="font-bold text-md">
                        <label htmlFor="snapPay-radio" >
                          اسنپ پی
                        </label>
                      </div>
                      <div className="text-xs text-blue-500">
                        <label htmlFor="snapPay-radio">
                          ۴ قسط ماهیانه {Number(333500).toLocaleString()} تومان
                        </label>
                      </div>
                    </div>
                    <div className="col-span-1 text-left justify-end mx-auto ml-0 items-center my-auto">
                      <input id="snapPay-radio" type="radio" name="paymentMethod" />
                    </div>
                  </div>
                </div> */}
                <div className=" text-sm bg-customGray p-4 rounded-xl">
                  <div className="flex justify-between items-center my-auto  h-full">
                    <div className="items-center my-auto">
                      <SnapPay />
                    </div>
                    <div>
                      <div className="font-bold text-md">
                        <label htmlFor="snapPay-radio">اسنپ پی</label>
                      </div>
                    </div>
                    <input
                      id="snapPay-radio"
                      type="radio"
                      name="paymentMethod"
                    />
                  </div>
                </div>

                <div className=" text-sm bg-customGray p-4 rounded-xl">
                  <div className="flex justify-between col-span-2 gap-2 h-full items-center my-auto">
                    <div>
                      <ZarinPal />
                    </div>
                    <div className="text-sm">
                      <label htmlFor="zarinPal-radio">زرین پال</label>
                    </div>
                    <input
                      id="zarinPal-radio"
                      type="radio"
                      name="paymentMethod"
                    />
                  </div>
                </div>
                {/* <div className="col-span-1 flex gap-5 bg-customGray p-4 rounded-xl">
                  <div className="flex">
                    <div>
                      <ZarinPal />
                    </div>
                    <div className="font-bold text-md">
                      <label htmlFor="zarinPal-radio">زرین پال</label>
                    </div>
                  </div>
                  <div className="justify-end mx-auto">
                    <input id="zarinPal-radio" type="radio" name="paymentMethod"/>
                  </div>
                </div> */}
              </div>

              <div className="mt-4 text-sm bg-customGray p-4 rounded-xl">
                <div className="grid grid-cols-2">
                  <div className="flex col-span-1 gap-2 items-center my-auto">
                    <div>
                      <Walet />
                    </div>
                    <div className="text-sm w-full">
                      <label htmlFor="wallet-radio">کیف پول</label>
                    </div>
                  </div>

                  <div className="flex col-span-1 gap-5 items-center my-auto justify-end">
                    <div className="text-sm font-bold text-primary">
                      <label htmlFor="wallet-radio" suppressHydrationWarning>
                        موجودی: {Number(350000).toLocaleString()}
                      </label>
                    </div>
                    <div>
                      <input
                        id="wallet-radio"
                        type="radio"
                        name="paymentMethod"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm p-2">
                <div className="grid grid-cols-2">
                  <div className="col-span-1 font-bold mt-2">
                    سود شما از این خرید:
                  </div>
                  <div className="col-span-1 flex gap-1 justify-end  mt-2">
                    <div className="text-primary" suppressHydrationWarning>
                      {Number(59000).toLocaleString()}
                    </div>
                    <div>تومان</div>
                  </div>

                  <div className="col-span-1 font-bold  mt-2">ارسال:</div>
                  <div className="col-span-1 flex gap-1 justify-end  mt-2">
                    <div className="text-primary" suppressHydrationWarning>
                      {Number(59000).toLocaleString()}
                    </div>
                    <div>تومان</div>
                  </div>

                  <div className="col-span-1 font-bold  mt-2">
                    مبلغ تمام شده جمع خرید:
                  </div>
                  <div className="col-span-1 flex gap-1 justify-end  mt-2">
                    <div className="text-primary" suppressHydrationWarning>
                      {Number(1275000).toLocaleString()}
                    </div>
                    <div>تومان</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-lg text-center">
              {session?.result ? (
                <button className="bg-primary p-3 w-full rounded-2xl text-white hover:bg-green-700">
                  پرداخت سفارش
                </button>
              ) : (
                <button className="bg-primary p-3 w-full rounded-2xl text-white hover:bg-green-700">
                  برای پرداخت سفارش وارد شوید
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModule;
