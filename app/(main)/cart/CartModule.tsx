"use client";
import {
  EmptyCart,
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
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MapComponent from "@/app/components/global/Map";
import MapComponentClient from "@/app/components/global/MapClient";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import CartItems from "./CartItems";
import { idID } from "@mui/material/locale";
import { useRouter } from "next/navigation";

const CartModule = ({ cartItems, session, cookies }) => {
  const router = useRouter();
  const [localCart, setLocalCart] = useState(cartItems);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [cordinates, setcordinates] = useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [calculates, setCalculates] = useState();
  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const [description, setDescription] = useState();
  const [provinceId, setprovinceId] = useState(0);
  const [neighborhoodId, setneighborhoodId] = useState(1);
  const [cities, setCities] = useState([]);
  const [neghberhoods, setNeighberhoods] = useState();
  const [cityId, setCityId] = useState(1);
  const [street, setStreet] = useState();
  const [alley, setAlley] = useState();
  const [plaque, setPlaque] = useState();
  const [floorNumber, setFloorNumber] = useState();
  const [provinces, setProvinces] = useState([]);
  const [calculate, setCalculate] = useState([]);
  const [defaultPayment, setDefaultPayment] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [calculateErrors, setCalculateErrors] = useState("");
  const [copunValue, setCopunValue] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const checkCopun = () => {
    priceCalculate(addressId, copunValue);
  };
  const getAddress = async () => {
    setLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/addresses?sortOrder=ASC&offset=0&limit=10&orderBy=id`,
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
          console.log(data);
          setAddresses(data.result);
          setAddressId(data?.result[0]?.id);
        });
    } catch (error) {
      console.log(error);
    }
    if (session == null) {
      return null;
    }
  };

  const priceCalculate = async () => {
    setLoading(true);
    try {
      await fetch(
        `https://nest-jahizan.chbk.run/v1/api/ecommerce/user/stocks/price`,
        {
          method: "POST",
          headers: {
            "x-session-id": cookies.value,
            Authorization: `  Bearer ${session?.token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            addressId: +addressId,
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
            console.log(data);
            setCalculate(data.result);
            setDefaultPayment(data.result.paymentOptions[0]);
            setLoading(false);
            setCalculateErrors("");
          }
        });
    } catch (error) {}
  };

  const submitPayment = async () => {
    setLoading(true);
    try {
      await fetch(
        `https://nest-jahizan.chbk.run/v1/api/ecommerce/user/payments/stock`,
        {
          method: "POST",
          headers: {
            "x-session-id": cookies.value,
            Authorization: `  Bearer ${session?.token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            addressId: +addressId,
            couponCode: copunValue == "" ? null : copunValue,
            paymentId: 2,
            variationPriceId: 2,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          router.push(data.result.redirectUrl);
        });
    } catch (error) {}
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
    // if (addressId) {
    //   priceCalculate(addressId);
    // }
    getAddress();
  }, []);

  useEffect(() => {
    if (addressId !== null) {
      priceCalculate();
    }
  }, [addressId]);

  const getNeighberhoods = async (nid) => {
    if (neighborhoodId !== null) {
      try {
        await fetcher({
          url: `/v1/api/ecommerce/neighborhoods?cityId=${nid}`,
          method: "GET",
        }).then((res) => {
          if (res.result.length !== 0) {
            setNeighberhoods(res.result);
            setneighborhoodId(res.result[0].id);
          } else {
            setNeighberhoods(null);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getProvinces = useCallback(async () => {
    await fetcher({
      url: `/v1/api/ecommerce/provinces`,
      method: "GET",
    }).then((res) => {
      setProvinces(res.result);
    });
  }, []); // every time id changed, new book will be loaded

  const getCities = useCallback(
    async (pid) => {
      await fetcher({
        url: `/v1/api/ecommerce/cities?provinceId=${pid}`,
        method: "GET",
      }).then((res) => {
        setCities(res.result);
        setCityId(res.result[0].id);
        getNeighberhoods(res.result[0].id);
        if (res.result[0].neighborhoodBase) {
          setneighborhoodId(res.result[0].id);
        } else {
          setneighborhoodId(null);
        }
      });
    },
    [provinceId]
  ); // every time id changed, new book will be loaded

  useEffect(() => {
    getProvinces();
    getCities(provinceId);
  }, [getProvinces]); // useEffect will run once and when id changes

  // useEffect(() => {
  //   if (provinces) {
  //     getProvinces();
  //     getCities(provinceId);
  //   }
  // }, [provinces]);

  useEffect(() => {
    if (provinceId) {
      getCities(provinceId);
      getNeighberhoods(cityId);
    }
  }, [provinceId]);

  // useEffect(() => {
  //
  //   getNeighberhoods(neighborhoodId);
  // }, [neighborhoodId]);

  const save = async () => {
    setIsLoading(true);
    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/user/addresses",
        method: "POST",
        body: {
          name: name,
          latitude: cordinates.latitude,
          longitude: cordinates.longitude,
          provinceId: +provinceId,
          cityId: +cityId,
          neighborhoodId: +neighborhoodId,
          street,
          alley,
          plaque,
          floorNumber,
        },
      });
      toast.success("موفق");
      setIsLoading(false);
      setOpen(false);
      getAddress();
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const getData = () => {
  //   console.log(cookies.value);
  //   const res = fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks/price`,
  //     {
  //       headers: {
  //         "x-session-id": cookies.value,
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log("ARE SHAYAD", data));
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  // useEffect(() => {
  //   // This code runs after `calculates` state has been updated
  //   console.log(calculates);
  // }, [calculates]); // Depend on `calculates` to run this effect

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
            {/* {console.log("asdasdas", calculates)} */}
            {localCart?.result.length === 0 ? (
              <div className="text-center">
                <EmptyCart />
                <h4 className="text-3xl font-bold my-4">
                  چیزی در سبد شما پیدا نشد
                </h4>
                <a
                  className="inline-block border border-primary text-primary rounded-2xl py-4 px-8 hover:text-white hover:bg-primary transition-all"
                  href=""
                >
                  همه محصولات
                </a>
              </div>
            ) : (
              localCart?.result.map((value, index) => (
                <CartItems
                  key={index}
                  localCart={localCart}
                  setLocalCart={setLocalCart}
                  cook={cookies.value}
                  item={value}
                  priceCalculate={priceCalculate}
                  session={session}
                />
              ))
            )}
          </div>

          <div className="col-span-1 shadow-md border border-customGray bg-white text-xs rounded-3xl mt-8 p-4 pb-10">
            <div className="text-sm mt-4">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="mb-2">نام</div>
                  <input
                    className="bg-[#F8F8F8] w-full text-gray-700 rounded rounded-2xl py-4 px-4 mb-3 focus:outline-none"
                    type="text"
                    value={session?.result?.firstname ?? ""}
                    disabled
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2">نام خانوادگی</div>
                  <input
                    className="bg-[#F8F8F8] w-full text-gray-700 rounded rounded-2xl py-4 px-4 mb-3 focus:outline-none"
                    type="text"
                    value={session?.result?.lastname ?? ""}
                    disabled
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col-span-1">انتخاب آدرس</div>
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
                        height={400}
                        onLocationChange={(location) => {
                          setcordinates({
                            latitude: location.lat,
                            longitude: location.lng,
                          });
                        }}
                        onAddressChange={(address) => {
                          setStreet(address);
                        }}
                      />
                      <div>
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          نام
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label
                              htmlFor="first_name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              استان
                            </label>
                            <select
                              className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              name=""
                              onChange={(e) => setprovinceId(e.target.value)}
                              id=""
                            >
                              {provinces.map((value, key) => (
                                <option key={key} value={value.id}>
                                  {value.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor="first_name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              شهر
                            </label>
                            <select
                              className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              name=""
                              id=""
                              onChange={(e) => {
                                setCityId(e.target.value);
                              }}
                            >
                              {cities?.map((value, key) => (
                                <option key={key} value={value.id}>
                                  {value.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {neghberhoods ? (
                            <div className="flex-1">
                              <label
                                htmlFor="first_name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                محله
                              </label>
                              <select
                                className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name=""
                                onChange={(e) => {
                                  setneighborhoodId(e.target.value);
                                }}
                                id=""
                              >
                                {neghberhoods?.map((value, key) => (
                                  <option key={key} value={value.id}>
                                    {value.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label
                              htmlFor="first_name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              خیابان
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                            />
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor="first_name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              کوچه
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                              onChange={(e) => setAlley(e.target.value)}
                            />
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor="first_name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              پلاک
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                              onChange={(e) => setPlaque(e.target.value)}
                            />
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor="first_name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              طبقه
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                              onChange={(e) => setFloorNumber(e.target.value)}
                            />
                          </div>
                        </div>
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          توضیحات
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      Disagree
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={save}
                      autoFocus
                      disabled={isLoading} // Disable button while isLoading
                    >
                      {isLoading ? <CircularProgress size={24} /> : "ذخیره"}
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

                    <select
                      onChange={(e) => setAddressId(e.target.value)}
                      className="appearance-none text-sm h-[63px] w-full rounded-2xl bg-customGray hover:border-gray-500 pr-4 shadow focus:outline-none focus:shadow-outline"
                    >
                      {session?.result ? (
                        addresses?.map((value, key) => {
                          return (
                            <option key={key} value={value.id}>
                              {value.name} | {value.street}
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
                  onChange={(e) => setCopunValue(e.target.value)}
                />
                <button
                  onClick={(e) => checkCopun()}
                  className="bg-primary absolute left-2 top-2 hover:bg-green-700 p-2 pl-3 pr-3 rounded-xl text-white"
                >
                  بررسی کد
                </button>
              </div>

              <div className="mt-5 text-sm">روش پرداخت</div>
              {calculateErrors !== "" ? (
                <div
                  class="p-4 mb-4 mt-2 text-sm text-red-800 rounded-xl bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span class="font-medium">{calculateErrors}</span>
                </div>
              ) : (
                ""
              )}

              <div className="flex flex-wrap mt-3 gap-2">
                {!calculate?.paymentOptions ? (
                  <>
                    <div className="flex-1 h-2.5 bg-gray-300 dark:bg-gray-600 w-24 mb-2.5 rounded-2xl animate-pulse h-[58px]"></div>
                    <div className="flex-1 h-2.5 bg-gray-300 dark:bg-gray-600 w-24 mb-2.5 rounded-2xl animate-pulse h-[58px]"></div>
                    <div className="flex-1 h-2.5 bg-gray-300 dark:bg-gray-600 w-24 mb-2.5 rounded-2xl animate-pulse h-[58px]"></div>
                  </>
                ) : (
                  calculate.paymentOptions.map((value, key) => {
                    return value.payments.map((payments, pKey) => (
                      <div
                        key={pKey}
                        className="flex-1 whitespace-nowrap text-sm bg-customGray p-4 rounded-xl"
                      >
                        <div className="flex justify-between items-center my-auto h-full">
                          <div>
                            <div className="font-bold text-md">
                              <label htmlFor={`${payments.id}-radio`}>
                                {payments.name}
                                <p className="text-blue-600">
                                  {value.variationPriceName}
                                </p>
                                <p>
                                  {Number(value.totalPrice).toLocaleString()}{" "}
                                  <span>تومان</span>
                                </p>
                              </label>
                            </div>
                          </div>
                          <input
                            id={`${payments.id}-radio`}
                            type="radio"
                            value={payments.id}
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(payments.id)}
                            // اگر آیتم فعلی اولین آیتم است، checked را تنظیم می‌کنیم
                            checked={payments.id === paymentMethod}
                          />
                        </div>
                      </div>
                    ));
                  })
                )}
              </div>

              <div className="mt-4 text-sm p-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="flex-1">جمع محصولات</span>

                  <span className="flex-1 text-left font-bold text-primary">
                    {loading ? (
                      <div className="flex-1 h-4 bg-gray-300 dark:bg-gray-600 mb-2.5 rounded-2xl animate-pulse w-full"></div>
                    ) : (
                      <span>
                        {Number(
                          defaultPayment?.totalProductPrice
                        ).toLocaleString()}{" "}
                        تومان
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="flex-1">سود شما از این خرید</span>

                  <span className="flex-1 text-left font-bold text-primary">
                    {loading ? (
                      <div className="flex-1 h-4 bg-gray-300 dark:bg-gray-600 mb-2.5 rounded-2xl animate-pulse w-full"></div>
                    ) : (
                      <span>
                        {Number(defaultPayment?.totalDiscount).toLocaleString()}{" "}
                        تومان
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="flex-1">هزینه ارسال</span>

                  <span className="flex-1 text-left font-bold text-primary">
                    {loading ? (
                      <div className="flex-1 text-left font-bold text-primary h-5 bg-gray-300 dark:bg-gray-600 w-24 mb-2.5 rounded-2xl animate-pulse w-full"></div>
                    ) : (
                      <span>
                        {Number(
                          defaultPayment?.totalShipmentPrice
                        ).toLocaleString()}{" "}
                        تومان
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="flex-1">مبلغ نهایی</span>

                  <span className="flex-1 text-left font-bold text-primary">
                    {loading ? (
                      <div className="flex-1 h-4 bg-gray-300 dark:bg-gray-600 mb-2.5 rounded-2xl animate-pulse w-full"></div>
                    ) : (
                      <span>
                        {Number(defaultPayment?.totalPrice).toLocaleString()}{" "}
                        تومان
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-lg text-center">
              {session?.result ? (
                <button
                  onClick={submitPayment}
                  disabled={
                    calculate?.stocks?.length === 0 || calculateErrors !== ""
                      ? true
                      : false
                  }
                  className={`bg-primary p-3 w-full rounded-2xl text-white hover:bg-green-700 disabled:opacity-25 disabled:pointer-events-none`}
                >
                  پرداخت سفارش
                </button>
              ) : (
                <Link href={`/login?redirect_back_url=/cart`}>
                  <button className="bg-primary p-3 w-full rounded-2xl text-white hover:bg-green-700">
                    برای پرداخت سفارش وارد شوید
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModule;
