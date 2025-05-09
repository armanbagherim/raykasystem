"use client";
import {
  EmptyCart,
  EmptyCarts,
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
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  ranno,
  DialogContentText,
  DialogTitle,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { fetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import CartItems from "./CartItems";
import { useRouter } from "next/navigation";
import MapClient from "@/app/components/global/MapClient";
import SearchSelect from "@/app/components/global/SearchSelect";
import { Delete } from "@mui/icons-material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import AddressModule from "./addressModule";

const CartModule = ({ cartItems, session, cookies }) => {
  const router = useRouter();
  const [localCart, setLocalCart] = useState(cartItems);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [calculate, setCalculate] = useState([]);
  const [defaultPayment, setDefaultPayment] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [calculateErrors, setCalculateErrors] = useState(null);
  const [copunValue, setCopunValue] = useState(null);
  const [noteDescription, setNoteDescription] = useState(null);
  const [acceptRules, setAcceptRules] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [activeAddress, setActiveAddress] = useState(null);
  const addressInitialized = useRef(false);
  const addressFetched = useRef(false);
  const priceInitialized = useRef(false);
  const [activeSpace, setActiveSpace] = useState(null);
  const [level, setLevel] = useState(1);

  const checkLocation = () => {
    if (coordinates.latitude !== null && coordinates.longitude !== null) {
      setLevel(2);
    }
  };
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["سبد خرید", "انتخاب آدرس", "پرداخت"];
  const handleClickOpen = () => {
    setOpen(true);
  };
  const checkCopun = () => {
    priceCalculate();
  };
  const getAddress = async () => {
    setLoading(true);
    if (session == null) {
      setLoading(false);
      addressFetched.current = true;
      return null;
    }
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/addresses?sortOrder=DESC&offset=0&orderBy=id`,
        {
          method: "GET",
          headers: {
            "x-session-id": cookies.value,
            Authorization: `Bearer ${session?.token}`,
          },
          cache: "no-store",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setLoading(false);
          setAddresses(data?.result ?? []);
          if (data?.result?.length > 0) {
            setAddressId(data?.result[0]?.id);
            setActiveAddress(data?.result[0]);
          }
          addressFetched.current = true;
        });
    } catch (error) { }
  };

  const priceCalculate = async () => {
    setIsLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks/price`,
        {
          method: "POST",
          headers: {
            "x-session-id": cookies.value,
            Authorization: `  Bearer ${session?.token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            addressId: addressId !== null ? +addressId : null,
            couponCode: copunValue == "" ? null : copunValue,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.statusCode === 400) {
            setCalculateErrors(data.message);
          } else {
            setCalculate(data.result);
            setDefaultPayment(data.result.paymentOptions[0]);
            setIsLoading(false);
            setCalculateErrors(null);
          }
        });
    } catch (error) { }
  };

  const submitPayment = async () => {
    setLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/payments/stock`,
        {
          method: "POST",
          headers: {
            "x-session-id": cookies.value,
            Authorization: `Bearer ${session?.token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            addressId: +addressId,
            couponCode: copunValue == "" ? null : copunValue,
            paymentId: paymentMethod,
            variationPriceId: defaultPayment?.variationPriceId,
            noteDescription: noteDescription,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.statusCode === 400) {
            setCalculateErrors(data.errors);
            setLoading(false);
          } else {
            router.push(data.result.redirectUrl);
            setLoading(false);
          }
        });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (calculate.paymentOptions) {
      if (paymentMethod !== 1) {
        setDefaultPayment(calculate?.paymentOptions[1]);
      } else {
        setDefaultPayment(calculate?.paymentOptions[0]);
      }
    }
  }, [paymentMethod]);

  useEffect(() => {
    if (!addressInitialized.current) {
      getAddress();
      addressInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (!addressFetched.current) {
      return;
    }
    if (priceInitialized.current && addressId == null) {
      return;
    }
    if (!priceInitialized.current) {
      priceInitialized.current = true;
    }

    priceCalculate();
  }, [addressId]);

  const save = async () => {
    setIsLoading(true);
    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/user/addresses",
        method: "POST",
        body: {
          name: name,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          provinceId: +provinceId,
          cityId: +cityId,
          neighborhoodId: neighborhoodId ? neighborhoodId : null,
          street,
          plaque,
          floorNumber,
          postalCode,
        },
      });
      toast.success("موفق");
      setIsLoading(false);
      setOpen(false);
      getAddress();
      setLevel(1);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (copunValue == null) {
      priceCalculate();
    }
  }, [copunValue]);

  return (
    <>
      <div className="mb-8">
        {localCart?.result?.length === 0 ? null : (
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </div>
      <div className="container justify-center mx-auto">
        <div
          className={`grid gap-0 grid-cols-1 justify-center md:gap-4 mx-4 md:mx-0 md:grid-cols-${localCart?.result?.length > 0 ? "3" : "0"
            }`}
        >
          <div className="col-span-2">
            {localCart?.result?.length === 0 ? (
              <div className="text-center">
                <EmptyCarts />
                <h4 className="text-3xl font-bold my-8">
                  چیزی در سبد شما پیدا نشد
                </h4>
                <Link
                  className="inline-block border border-primary text-primary rounded-2xl py-4 px-8 hover:text-white hover:bg-primary transition-all"
                  href="/search"
                >
                  همه محصولات
                </Link>
              </div>
            ) : (
              <>
                {activeStep === 0 && (
                  <div className=" divide-gray-200 md:px-0">
                    {localCart?.result.map((value, index) => (
                      <CartItems
                        key={index}
                        localCart={localCart}
                        setLocalCart={setLocalCart}
                        cook={cookies.value}
                        item={value}
                        priceCalculate={priceCalculate}
                        session={session}
                      />
                    ))}
                  </div>
                )}
                {activeStep === 1 && (
                  <div className="bg-white shadow-md border border-customGray rounded-3xl p-6 pb-4 md:mb-0 mb-4">
                    <div className="col-span-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold">انتخاب آدرس</span>
                        {session?.token ? (
                          <button
                            variant="outlined"
                            onClick={handleClickOpen}
                            className="col-span-1 flex gap-2 justify-end outline-none"
                          >
                            <span>
                              <PlusSmall />
                            </span>
                            <span>افزودن آدرس</span>
                          </button>
                        ) : (
                          <Link href={`/login?redirect_back_url=/cart`}>
                            <button
                              variant="outlined"
                              className="col-span-1 flex gap-2 justify-end outline-none w-full"
                            >
                              <span>ورود برای افزودن آدرس</span>
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 space-y-2 mx-2 md:mx-0">
                      {session?.result && addresses?.length ? (
                        addresses?.map((value, key) => (
                          <div
                            key={key}
                            onClick={() => {
                              setAddressId(value.id);
                              setActiveAddress(value);
                            }}
                            className={`flex flex-col gap-2 cursor-pointer border rounded-3xl py-3 px-4 ${addressId === value.id
                              ? "border-primary bg-primary/10"
                              : "border-gray-200 hover:border-primary"
                              }`}
                          >
                            <span className="text-primary font-bold">
                              {value.name}
                            </span>
                            <div className="flex flex-wrap gap-1 text-sm">
                              <span>خیابان {value.street}</span>
                              <span>پلاک {value.plaque}</span>
                              <span>طبقه {value.floorNumber}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>آدرسی جهت نمایش پیدا نشد</div>
                      )}
                    </div>
                    <AddressModule
                      getAddress={getAddress}
                      open={open}
                      handleClose={handleClose}
                      coordinates={coordinates}
                      setCoordinates={setCoordinates}
                    />
                  </div>
                )}
                {activeStep === 2 && (
                  <>
                    <div className="text-sm mt-4">
                      <TextareaAutosize
                        className="text-sm bg-white p-4 w-full rounded-xl outline-none"
                        type="text"
                        minRows={3}
                        placeholder="یادداشت سفارش"
                        value={noteDescription ?? null}
                        onChange={(e) =>
                          setNoteDescription(
                            e.target.value !== "" ? e.target.value : null
                          )
                        }
                      ></TextareaAutosize>
                      <div className="mt-5 text-sm">روش پرداخت</div>
                      <div className=" mt-3 gap-2 grid grid-cols-1 md:grid-cols-2">
                        {!calculate?.paymentOptions ? (
                          <>
                            <div className="flex-1 w-full h-2.5 bg-gray-300 mb-2.5 rounded-2xl animate-pulse h-[58px]"></div>
                            <div className="flex-1 w-full h-2.5 bg-gray-300 mb-2.5 rounded-2xl animate-pulse h-[58px]"></div>
                            <div className="flex-1 w-full h-2.5 bg-gray-300 mb-2.5 rounded-2xl animate-pulse h-[58px]"></div>
                          </>
                        ) : (
                          calculate.paymentOptions.map((paymentOption, key) => {
                            return paymentOption.payments.map(
                              (payment, pKey) => (
                                <div
                                  key={pKey}
                                  className="flex-1 w-full whitespace-nowrap text-sm bg-white p-4 rounded-xl mb-2"
                                >
                                  <div className="flex justify-between items-center my-auto h-full">
                                    <div>
                                      <div className="font-bold text-md">
                                        <label htmlFor={`${payment.id}-radio`}>
                                          <div className="flex">
                                            <span>
                                              <div className="bg-white ml-2 rounded-md">
                                                <img
                                                  className="w-10 h-auto"
                                                  src={payment.imageUrl}
                                                  alt=""
                                                />
                                              </div>
                                            </span>
                                            <div className="">
                                              <div>
                                                {payment?.titleMessage ??
                                                  payment.name}
                                              </div>
                                              <div className="whitespace-break-spaces font-medium my-2">
                                                {payment?.description}
                                              </div>
                                              <p className="text-primary">
                                                {Number(
                                                  paymentOption.totalPrice
                                                ).toLocaleString()}{" "}
                                                <span>ءتء</span>
                                              </p>
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                    <input
                                      id={`${payment.id}-radio`}
                                      type="radio"
                                      value={payment.id}
                                      name="paymentMethod"
                                      onChange={(e) =>
                                        setPaymentMethod(payment.id)
                                      }
                                      checked={payment.id === paymentMethod}
                                    />
                                  </div>
                                </div>
                              )
                            );
                          })
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          {localCart?.result?.length > 0 && (
            <div className="col-span-1 shadow-md border border-customGray bg-white text-xs rounded-3xl mt-0 p-4 pb-4">
              {activeStep === 2 && (
                <>
                  <div className="mt-4 relative mb-4">
                    <input
                      className="text-sm bg-[#f2f2f2] p-4 w-full rounded-2xl outline-none mb-4"
                      type="text"
                      placeholder="کد تخفیف"
                      value={copunValue ?? null}
                      onChange={(e) =>
                        setCopunValue(
                          e.target.value !== "" ? e.target.value : null
                        )
                      }
                    />
                    <div className="absolute left-2 top-2">
                      {copunValue !== null && (
                        <button
                          className="outline-none text-red-900"
                          onClick={() => {
                            setCopunValue(null);
                          }}
                        >
                          <Delete fontSize="medium" />
                        </button>
                      )}
                      <button
                        onClick={(e) => checkCopun()}
                        className="bg-primary hover:bg-green-700 p-2 pl-3 pr-3 rounded-xl text-white"
                      >
                        بررسی کد
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="text-sm p-2">
                {console.log(calculateErrors)}
                {activeStep === 1 ? (
                  calculateErrors ? (
                    <div
                      className="p-4 mb-4 mt-2 text-sm text-red-800 rounded-xl bg-red-50"
                      role="alert"
                    >
                      <span className="font-medium">{calculateErrors}</span>
                    </div>
                  ) : (
                    ""
                  )
                ) : null}
                <div className="flex justify-between items-center mb-4">
                  <span className="flex-1">جمع محصولات</span>
                  <span className="flex-1 text-left font-bold text-primary">
                    {isLoading ? (
                      <div className="flex-1 h-3 bg-gray-300 mb-2.5 rounded-2xl animate-pulse w-full"></div>
                    ) : (
                      <span>
                        {Number(
                          defaultPayment?.totalProductPrice
                        ).toLocaleString()}{" "}
                        ءتء
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="flex-1">سود شما از این خرید</span>
                  <span className="flex-1 text-left font-bold text-primary">
                    {isLoading ? (
                      <div className="flex-1 h-3 bg-gray-300 mb-2.5 rounded-2xl animate-pulse w-full"></div>
                    ) : (
                      <span>
                        {Number(defaultPayment?.totalDiscount).toLocaleString()}{" "}
                        ءتء
                      </span>
                    )}
                  </span>
                </div>
                {activeStep !== 0 && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <span className="flex-1">روش ارسال</span>
                      <span className="flex-1 text-left font-bold text-primary">
                        {isLoading ? (
                          <div className="flex-1 h-3 bg-gray-300 mb-2.5 rounded-2xl animate-pulse w-full"></div>
                        ) : (
                          <span className="text-primary">
                            {calculate.paymentOptions[0]?.shipmentTypeName}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="flex-1">هزینه ارسال</span>
                      <span className="flex-1 text-left font-bold text-primary">
                        {isLoading ? (
                          <div className="flex-1 text-left font-bold text-primary h-3 bg-gray-300 w-24 mb-2.5 rounded-2xl animate-pulse w-full"></div>
                        ) : (
                          <span>
                            {Number(
                              defaultPayment?.totalShipmentPrice
                            ).toLocaleString()}{" "}
                            ءتء
                          </span>
                        )}
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center mb-4">
                  <span className="flex-1">مبلغ نهایی</span>
                  <span className="flex-1 text-left font-bold text-primary">
                    {isLoading ? (
                      <div className="flex-1 h-3 bg-gray-300 mb-2.5 rounded-2xl animate-pulse w-full"></div>
                    ) : (
                      <span>
                        {Number(defaultPayment?.totalPrice).toLocaleString()}{" "}
                        ءتء
                      </span>
                    )}
                  </span>
                </div>
              </div>
              {activeStep === 2 && (
                <div className="mb-4 flex items-center justify-start bg-gray-100 p-3 rounded-lg gap-2">
                  <input
                    type="checkbox"
                    id="acceptRules"
                    checked={acceptRules}
                    onChange={(e) => setAcceptRules(e.target.checked)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="acceptRules" className="text-sm cursor-pointer">
                    <Link className="text-primary font-bold" href="/pages/rules">
                      قوانین و مقررات
                    </Link>{" "}
                    وبسایت را می‌پذیرم
                  </label>
                </div>
              )}
              <div className="flex gap-4 text-md font-bold">
                {activeStep !== 0 && (
                  <button
                    onClick={() => setActiveStep((prev) => prev - 1)}
                    className="bg-[#d8d8d8] p-3 w-full rounded-2xl text-black py-4 hover:bg-[#c0c0c0] disabled:opacity-25 disabled:pointer-events-none"
                  >
                    مرحله قبل
                  </button>
                )}
                {activeStep === 2 &&
                  (session?.result ? (
                    <button
                      onClick={submitPayment}
                      disabled={
                        calculate?.stocks?.length === 0 ||
                        calculateErrors ||
                        isLoading !== false ||
                        loading !== false ||
                        !acceptRules
                      }
                      className="bg-primary p-3 w-full rounded-2xl text-white hover:bg-green-700 disabled:opacity-25 disabled:pointer-events-none"
                    >
                      پرداخت سفارش
                    </button>
                  ) : (
                    <Link href={`/login?redirect_back_url=/cart`}>
                      <button className="bg-primary p-3 w-full rounded-2xl text-white hover:bg-green-700">
                        برای پرداخت سفارش وارد شوید
                      </button>
                    </Link>
                  ))}
                {activeStep === 0 &&
                  (session?.result ? (
                    <button
                      onClick={() => setActiveStep(1)}
                      className="bg-primary p-3 w-full rounded-2xl text-white py-4 hover:bg-green-700 disabled:opacity-25 disabled:pointer-events-none"
                    >
                      وارد کردن آدرس
                    </button>
                  ) : (
                    <Link
                      className="bg-primary p-3 w-full rounded-2xl text-white py-4 hover:bg-green-700 disabled:opacity-25 disabled:pointer-events-none text-center"
                      href={`/login?redirect_back_url=/cart`}
                    >
                      <button onClick={() => setActiveStep(1)}>
                        ورود یا ثبت نام
                      </button>
                    </Link>
                  ))}
                {activeStep === 1 &&
                  (!calculateErrors ? (
                    <button
                      onClick={() => setActiveStep(2)}
                      className="bg-primary p-3 w-full rounded-2xl text-white py-4 hover:bg-green-700 disabled:opacity-25 disabled:pointer-events-none"
                    >
                      پرداخت
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-primary p-3 w-full rounded-2xl text-white py-4 hover:bg-green-700 disabled:opacity-25 disabled:pointer-events-none"
                    >
                      پرداخت
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModule;