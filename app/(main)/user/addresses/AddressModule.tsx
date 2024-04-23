"use client";
import { PlusSmall, Trash } from "@/app/components/design/Icons";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import MapComponentClient from "@/app/components/global/MapClient";
import { fetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";

export default function AddressModule({ cookies, session }) {
  const [addresses, setAddresses] = useState();
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
  const [calculateErrors, setCalculateErrors] = useState("");
  const [copunValue, setCopunValue] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getAddress = async () => {
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
          setAddresses(data.result);
        });
    } catch (error) {}
    if (session == null) {
      return null;
    }
  };
  useEffect(() => {
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
      } catch (error) {}
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
          postalCode,
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

  useEffect(() => {
    getProvinces();
    getCities(provinceId);
  }, [getProvinces]);

  useEffect(() => {
    if (provinceId) {
      getCities(provinceId);
      getNeighberhoods(cityId);
    }
  }, [provinceId]);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-6 items-center mb-4 border-b border-b-gray-200 pb-4">
        <h1 className="text-2xl peyda ">آدرس های شما</h1>
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
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth="xl"
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">ثبت آدرس جدید</DialogTitle>
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
                <div className="flex-1">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    کد پستی
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
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
            انصراف
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
      <div className="grid grid-cols-12 w-full gap-4">
        {addresses?.map((value) => (
          <div
            key={value.id}
            className="col-span-4 w-full border border-gray-200 rounded-2xl p-4 "
          >
            <div className="flex justify-between mb-4">
              <span className="font-bold text-primary"> {value.name}</span>
              <span>
                <Trash />
              </span>
            </div>
            <div className="text-sm leading-7">
              <span>خیابان {value.street}</span> <span>کوچه {value.alley}</span>{" "}
              <span>طبقه {value.floorNumber}</span>{" "}
              <span>پلاک {value.plaque}</span>{" "}
              <span>کد پستی {value.postalCode}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
