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
  TextareaAutosize,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MapComponent from "@/app/components/global/Map";
import MapComponentClient from "@/app/components/global/MapClient";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import CartItems from "./CartItems";
import { idID } from "@mui/material/locale";
import { useRouter } from "next/navigation";
import MapClient from "@/app/components/global/MapClient";
import SearchSelect from "@/app/components/global/SearchSelect";
import { Delete } from "@mui/icons-material";

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
  const [provinceId, setprovinceId] = useState(1);
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
  const [noteDescription, setNoteDescription] = useState(null);
  const [postalCode, setPostalCode] = useState();
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
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
          }
          addressFetched.current = true;
        });
    } catch (error) {}
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
            setCalculateErrors("");
          }
        });
    } catch (error) {}
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
          }
          router.push(data.result.redirectUrl);
          setLoading(false);
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

  const getProvinces = async () => {
    await fetcher({
      url: `/v1/api/ecommerce/provinces`,
      method: "GET",
    }).then((res) => {
      setProvinces(res.result);
    });
  };

  const getCities = async (pid) => {
    await fetcher({
      url: `/v1/api/ecommerce/cities?provinceId=${pid}`,
      method: "GET",
    }).then((res) => {
      setCityId(res.result[0].id);
      setCities(res.result);
    });
  };

  const getNeighberhoods = async (cid) => {
    await fetcher({
      url: `/v1/api/ecommerce/neighborhoods?cityId=${cid}`,
      method: "GET",
    }).then((res) => {
      if (res.result.length !== 0) {
        setNeighberhoods(res.result);
        setneighborhoodId(null);
      } else {
        setneighborhoodId(null);
        setNeighberhoods(null);
      }
    });
  };
  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (provinceId !== null) {
      getCities(provinceId);
    }
  }, [provinceId]);

  useEffect(() => {
    if (cityId !== null) {
      getNeighberhoods(cityId);
    }
  }, [cityId]);

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
          alley,
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
      <div className="container justify-center mx-auto">
        <div
          className={`grid gap-4 grid-cols-1 md:grid-cols-${
            localCart?.result?.length > 0 ? "3" : "0"
          }`}
        >
          <div className="col-span-2">
            {localCart?.result?.length === 0 ? (
              <div className="text-center">
                <svg
                  width="195"
                  height="216"
                  viewBox="0 0 195 216"
                  fill="none"
                  className="mx-auto mb-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_f_48_9314)">
                    <rect
                      x="25"
                      y="179"
                      width="124"
                      height="12"
                      fill="#1B3554"
                    />
                  </g>
                  <rect x="26" y="15" width="124" height="79" fill="#E0E5EC" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M26 15V135H6V62.4366L16.0016 47.0864L26 15Z"
                    fill="#CFD4DC"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M149 15V135H169V62.4366L158.998 47.0864L149 15Z"
                    fill="#CFD4DC"
                  />
                  <path
                    d="M6 62H169V198C169 200.761 166.761 203 164 203H11C8.23858 203 6 200.761 6 198V62Z"
                    fill="white"
                  />
                  <path
                    opacity="0.5"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M55 117.548C55 116.848 55.3594 116.197 55.9811 115.876C57.3648 115.161 60.0086 114 62.5778 114C65.146 114 67.7143 115.161 69.0525 115.875C69.6555 116.197 70 116.835 70 117.519C70 119.129 68.1457 120.185 66.6307 119.639C65.4137 119.201 63.9827 118.846 62.54 118.846C61.0687 118.846 59.5975 119.215 58.3503 119.665C56.8381 120.211 55 119.155 55 117.548Z"
                    fill="#1B3554"
                  />
                  <path
                    opacity="0.5"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M106 117.548C106 116.848 106.359 116.197 106.981 115.876C108.365 115.161 111.009 114 113.578 114C116.146 114 118.714 115.161 120.053 115.875C120.656 116.197 121 116.835 121 117.519C121 119.129 119.146 120.185 117.631 119.639C116.414 119.201 114.983 118.846 113.54 118.846C112.069 118.846 110.597 119.215 109.35 119.665C107.838 120.211 106 119.155 106 117.548Z"
                    fill="#1B3554"
                  />
                  <ellipse
                    opacity="0.5"
                    cx="88"
                    cy="138.003"
                    rx="16"
                    ry="7.00303"
                    fill="#1B3554"
                  />
                  <circle
                    opacity="0.149343"
                    cx="51"
                    cy="77"
                    r="6"
                    fill="#1B3554"
                  />
                  <circle
                    opacity="0.149343"
                    cx="124"
                    cy="77"
                    r="6"
                    fill="#1B3554"
                  />
                  <path
                    d="M51 76.6926V39.5C51 19.3416 67.3416 3 87.5 3C107.658 3 124 19.3416 124 39.5V76.6926"
                    stroke="#5E7085"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g filter="url(#filter1_d_48_9314)">
                    <circle
                      cx="168.6"
                      cy="175.6"
                      r="17.6"
                      fill="url(#paint0_linear_48_9314)"
                    />
                  </g>
                  <path
                    d="M164.739 183.224H173.433V181.183H168.241C170.283 179.458 173.152 177.135 173.152 174.16C173.152 171.925 171.761 170.288 168.998 170.288C166.692 170.288 164.809 171.644 164.721 174.583H167.115C167.132 173.228 167.784 172.383 168.963 172.383C170.177 172.383 170.688 173.157 170.688 174.301C170.688 176.66 167.643 178.93 164.739 181.394V183.224Z"
                    fill="white"
                  />
                  <defs>
                    <filter
                      id="filter0_f_48_9314"
                      x="0.813055"
                      y="154.813"
                      width="172.374"
                      height="60.3739"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feGaussianBlur
                        stdDeviation="12.0935"
                        result="effect1_foregroundBlur_48_9314"
                      />
                    </filter>
                    <filter
                      id="filter1_d_48_9314"
                      x="143"
                      y="152"
                      width="51.1992"
                      height="51.2"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="4" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 0.415686 0 0 0 0 0.596078 0 0 0 0.3 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_48_9314"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_48_9314"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_48_9314"
                      x1="168.6"
                      y1="140.4"
                      x2="133.4"
                      y2="175.6"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#20AC73" />
                      <stop offset="1" stop-color="#0C452E" />
                    </linearGradient>
                  </defs>
                </svg>

                <h4 className="text-3xl font-bold my-8">
                  چیزی در سبد شما پیدا نشد
                </h4>
                <a
                  className="inline-block border border-primary text-primary rounded-2xl py-4 px-8 hover:text-white hover:bg-primary transition-all"
                  href="/search"
                >
                  همه محصولات
                </a>
              </div>
            ) : (
              <>
                <div className=" divide-gray-200 px-4 md:px-0">
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
              </>
            )}
          </div>
          {localCart?.result?.length > 0 && (
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
                    {" "}
                    <DialogTitle id="responsive-dialog-title">
                      ثبت آدرس جدید
                    </DialogTitle>
                    <DialogContent className="w-full md:w-[600px]">
                      <DialogContentText>
                        <div>
                          {level === 1 ? (
                            <MapClient
                              height={400}
                              defaultLocation={{
                                lat: coordinates?.latitude ?? 35.65326,
                                lng: coordinates?.longitude ?? 51.35471,
                              }}
                              onLocationChange={(location) => {
                                setCoordinates({
                                  latitude: location.lat.toString(),
                                  longitude: location.lng.toString(),
                                });
                              }}
                            />
                          ) : (
                            <div className="">
                              <div className="mb-8">
                                <TextField
                                  type="text"
                                  id="first_name"
                                  className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                  required
                                  label="نام آدرس: مثال خانه"
                                  value={name}
                                  fullWidth
                                  variant="standard"
                                  onChange={(e) => {
                                    setName(e.target.value);
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="">
                                  {provinces && (
                                    <SearchSelect
                                      onChange={(e) => {
                                        if (e !== null) {
                                          setprovinceId(e.id);
                                        } else {
                                          setprovinceId(1);
                                        }
                                      }}
                                      data={provinces}
                                      value={provinceId}
                                      defaultValue={provinceId}
                                      isDiff={true}
                                      diffName="name"
                                      label="استان"
                                    />
                                  )}
                                </div>
                                <div className="">
                                  {cities && (
                                    <SearchSelect
                                      onChange={(e) => {
                                        if (e !== null) {
                                          setCityId(e.id);
                                        } else {
                                          setCityId(cities[0].id);
                                        }
                                      }}
                                      data={cities}
                                      value={cityId}
                                      defaultValue={cityId}
                                      isDiff={true}
                                      diffName="name"
                                      label="شهر"
                                    />
                                  )}
                                </div>
                                {neghberhoods && (
                                  <SearchSelect
                                    nullable={true}
                                    onChange={(e) => {
                                      if (e !== null) {
                                        setneighborhoodId(e.id);
                                      } else {
                                        setneighborhoodId(neghberhoods[0].id);
                                      }
                                    }}
                                    data={neghberhoods}
                                    value={neighborhoodId}
                                    defaultValue={neighborhoodId}
                                    label="محله"
                                  />
                                )}
                              </div>
                              <div className="flex gap-4 mb-6">
                                <div className="w-full flex-1">
                                  <TextField
                                    type="text"
                                    variant="standard"
                                    id="first_name"
                                    className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    required
                                    label="آدرس"
                                    fullWidth
                                    value={street}
                                    onChange={(e) => {
                                      setStreet(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex gap-4">
                                <div className="flex-1">
                                  <TextField
                                    type="text"
                                    variant="standard"
                                    id="first_name"
                                    className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    required
                                    label="پلاک"
                                    value={plaque}
                                    onChange={(e) => {
                                      setPlaque(e.target.value);
                                    }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <TextField
                                    type="text"
                                    variant="standard"
                                    id="first_name"
                                    className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    required
                                    label="طبقه"
                                    value={floorNumber}
                                    onChange={(e) => {
                                      setFloorNumber(e.target.value);
                                    }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <TextField
                                    type="text"
                                    variant="standard"
                                    id="first_name"
                                    className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    required
                                    label="کد پستی"
                                    value={postalCode}
                                    onChange={(e) => {
                                      setPostalCode(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions className="!pt-4 border-t border-t-gray-300 !justify-between">
                      <Button
                        autoFocus
                        onClick={(e) =>
                          level === 1 ? handleClose() : setLevel(1)
                        }
                      >
                        {level === 1 ? "انصراف" : "مرحله قبل"}
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={level === 1 ? checkLocation : save}
                        autoFocus
                        disabled={
                          coordinates.latitude === "35.65326" &&
                          coordinates.longitude === "51.354710000000004"
                            ? true
                            : false
                        } // Disable button while isLoading
                      >
                        {isLoading ? (
                          <CircularProgress size={24} />
                        ) : level === 1 ? (
                          "مرحله بعدی"
                        ) : (
                          "ذخیره"
                        )}
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
                        {session?.result && addresses?.length ? (
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
                <div className="mt-4 relative mb-4">
                  <input
                    className="text-sm bg-customGray p-4 w-full rounded-xl outline-none"
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
                      className="bg-primary  hover:bg-green-700 p-2 pl-3 pr-3 rounded-xl text-white"
                    >
                      بررسی کد
                    </button>
                  </div>
                </div>
                <TextareaAutosize
                  className="text-sm bg-customGray p-4 w-full rounded-xl outline-none"
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
                {calculateErrors !== "" ? (
                  <div
                    class="p-4 mb-4 mt-2 text-sm text-red-800 rounded-xl bg-red-50  "
                    role="alert"
                  >
                    <span class="font-medium">{calculateErrors}</span>
                  </div>
                ) : (
                  ""
                )}
                <div className=" mt-3 gap-2">
                  {!calculate?.paymentOptions ? (
                    <>
                      <div className="flex-1 w-full h-2.5 bg-gray-300  mb-2.5 rounded-2xl animate-pulse h-[58px]"></div>
                      <div className="flex-1 w-full h-2.5 bg-gray-300  mb-2.5 rounded-2xl animate-pulse h-[58px]"></div>
                      <div className="flex-1 w-full h-2.5 bg-gray-300  mb-2.5 rounded-2xl animate-pulse h-[58px]"></div>
                    </>
                  ) : (
                    calculate.paymentOptions.map((paymentOption, key) => {
                      return paymentOption.payments.map((payment, pKey) => (
                        <div
                          key={pKey}
                          className="flex-1 w-full whitespace-nowrap text-sm bg-customGray p-4 rounded-xl mb-2"
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
                                        {payment?.titleMessage ?? payment.name}
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
                              onChange={(e) => setPaymentMethod(payment.id)}
                              checked={payment.id === paymentMethod}
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
                      {isLoading ? (
                        <div className="flex-1 h-4 bg-gray-300  mb-2.5 rounded-2xl animate-pulse w-full"></div>
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
                        <div className="flex-1 h-4 bg-gray-300  mb-2.5 rounded-2xl animate-pulse w-full"></div>
                      ) : (
                        <span>
                          {Number(
                            defaultPayment?.totalDiscount
                          ).toLocaleString()}{" "}
                          ءتء
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="flex-1">روش ارسال</span>

                    <span className="flex-1 text-left font-bold text-primary">
                      {calculate?.paymentOptions ? (
                        <>
                          <span className="text-primary">
                            {calculate.paymentOptions[0]?.shipmentTypeName}
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex-1">هزینه ارسال</span>

                    <span className="flex-1 text-left font-bold text-primary">
                      {isLoading ? (
                        <div className="flex-1 text-left font-bold text-primary h-5 bg-gray-300  w-24 mb-2.5 rounded-2xl animate-pulse w-full"></div>
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
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex-1">مبلغ نهایی</span>

                    <span className="flex-1 text-left font-bold text-primary">
                      {isLoading ? (
                        <div className="flex-1 h-4 bg-gray-300  mb-2.5 rounded-2xl animate-pulse w-full"></div>
                      ) : (
                        <span>
                          {Number(defaultPayment?.totalPrice).toLocaleString()}{" "}
                          ءتء
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
                      calculate?.stocks?.length === 0 ||
                      calculateErrors !== "" ||
                      isLoading !== false ||
                      loading !== false
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
          )}
        </div>
      </div>
    </>
  );
};

export default CartModule;
