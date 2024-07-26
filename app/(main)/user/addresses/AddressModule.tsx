"use client";
import { Edit, PlusSmall, Trash } from "@/app/components/design/Icons";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import MapComponentClient from "@/app/components/global/MapClient";
import { fetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import MapClient from "@/app/components/global/MapClient";
import SearchSelect from "@/app/components/global/SearchSelect";
import Swal from "sweetalert2";

export default function AddressModule({ cookies, session }) {
  const [addresses, setAddresses] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [level, setLevel] = useState(1);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setActiveSpace(null);
    setLevel(1);
    setCoordinates({
      latitude: null,
      longitude: null,
    });
  };
  const getAddress = async () => {
    setLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/addresses?sortOrder=DESC&offset=0&limit=30&orderBy=id`,
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
          setLoading(false);
        });
    } catch (error) {}
    if (session == null) {
      return null;
    }
  };
  useEffect(() => {
    getAddress();
  }, []);

  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [isAddressManuallyChanged, setIsAddressManuallyChanged] =
    useState(false);

  const [name, setName] = useState();
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setprovinceId] = useState(1);
  const [neighborhoodId, setneighborhoodId] = useState(1);
  const [cities, setCities] = useState([]);
  const [neghberhoods, setNeighberhoods] = useState([]);
  const [cityId, setCityId] = useState(1);
  const [street, setStreet] = useState();
  const [alley, setAlley] = useState();
  const [plaque, setPlaque] = useState();
  const [floorNumber, setFloorNumber] = useState();
  const [postalCode, setPostalCode] = useState();
  const [activeSpace, setActiveSpace] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);

  const getProvinces = async () => {
    setFetchingData(true);
    await fetcher({
      url: `/v1/api/ecommerce/provinces`,
      method: "GET",
    }).then((res) => {
      setProvinces(res.result);
      setFetchingData(false);
    });
  };

  const getCities = async (pid) => {
    setFetchingData(true);
    await fetcher({
      url: `/v1/api/ecommerce/cities?provinceId=${pid}`,
      method: "GET",
    }).then((res) => {
      setCityId(res.result[0].id);
      setCities(res.result);
      setFetchingData(false);
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
        setFetchingData(false);

        // if (address?.result?.address?.neighborhoodId !== neighborhoodId) {
        //   setneighborhoodId(res.result[0].id);
        // }
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

  const deleteOrder = async (id) => {
    try {
      const result = await Swal.fire({
        title: "مطمئن هستید؟",
        text: "با حذف این گزینه امکان بازگشت آن وجود ندارد",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله حذفش کن",
        cancelButtonText: "لغو",
      });

      if (result.isConfirmed) {
        const req = await fetcher({
          url: `/v1/api/ecommerce/user/addresses/${id}`,
          method: "DELETE",
        });
        toast.success("موفق");
        getAddress();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const EditAddress = (id) => {
    const address = addresses.filter((value) => value.id == id);
    setActiveSpace(address[0]);
    setprovinceId(address[0].provinceId);
    setLevel(1);

    setOpen(true);
  };

  const save = async () => {
    if (activeSpace === null) {
      try {
        const req = await fetcher({
          url: `/v1/api/ecommerce/user/addresses`,
          method: "POST",
          body: {
            name: name,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            provinceId: +provinceId,
            cityId: +cityId,
            neighborhoodId: neighborhoodId === null ? null : +neighborhoodId,
            street,
            alley,
            plaque,
            floorNumber,
            postalCode,
          },
        });

        toast.success("موفق");
        getAddress();
        setOpen(false);
        setActiveSpace(null);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const req = await fetcher({
          url: `/v1/api/ecommerce/user/addresses/${activeSpace.id}`,
          method: "PUT",
          body: {
            name: activeSpace.name,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            provinceId: +activeSpace.provinceId,
            cityId: +activeSpace.cityId,
            neighborhoodId:
              neighborhoodId === null ? null : +activeSpace.neighborhoodId,
            street: activeSpace.street,
            alley: activeSpace.alley,
            plaque: activeSpace.plaque,
            floorNumber: activeSpace.floorNumber,
            postalCode: activeSpace.postalCode,
          },
        });

        toast.success("موفق");
        getAddress();
        setOpen(false);
        setLevel(1);
        setActiveSpace(null);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const checkLocation = () => {
    if (coordinates.latitude !== null && coordinates.longitude !== null) {
      setLevel(2);
    }
  };

  return loading ? (
    "loading"
  ) : (
    <div className="w-full">
      <div className="flex justify-between mb-6 items-center mb-4 border-b border-b-gray-200 pb-4">
        <h1 className="text-2xl peyda">آدرس های شما</h1>
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
        {" "}
        <DialogTitle id="responsive-dialog-title">ثبت آدرس جدید</DialogTitle>
        <DialogContent className="w-full md:w-[600px]">
          {fetchingData ? (
            <div className="w-full h-full absolute z-[99999] top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-white">
              <CircularProgress />
            </div>
          ) : (
            <DialogContentText>
              <div>
                {level === 1 ? (
                  <MapClient
                    height={400}
                    defaultLocation={{
                      lat: activeSpace?.latitude ?? 35.65326,
                      lng: activeSpace?.longitude ?? 51.35471,
                    }}
                    onLocationChange={(location) => {
                      setCoordinates({
                        latitude: location.lat.toString(),
                        longitude: location.lng.toString(),
                      });

                      setIsAddressManuallyChanged(false);
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
                        value={activeSpace !== null ? activeSpace.name : name}
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                          setName(e.target.value);
                          if (activeSpace !== null) {
                            setActiveSpace({
                              ...activeSpace,
                              name: e.target.value,
                            });
                          }
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
                                if (activeSpace !== null) {
                                  setActiveSpace({
                                    ...activeSpace,
                                    provinceId: e.id,
                                  });
                                }
                              } else {
                                setprovinceId(1);
                              }
                            }}
                            data={provinces}
                            value={
                              activeSpace !== null
                                ? activeSpace.provinceId
                                : provinceId
                            }
                            defaultValue={
                              activeSpace !== null
                                ? activeSpace.provinceId
                                : provinceId
                            }
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

                                if (activeSpace !== null) {
                                  setActiveSpace({
                                    ...activeSpace,
                                    cityId: e.id,
                                  });
                                }
                              } else {
                                setCityId(cities[0].id);
                              }
                            }}
                            data={cities}
                            value={
                              activeSpace !== null ? activeSpace.cityId : cityId
                            }
                            defaultValue={
                              activeSpace !== null ? activeSpace.cityId : cityId
                            }
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

                              if (activeSpace !== null) {
                                setActiveSpace({
                                  ...activeSpace,
                                  neighborhoodId: e.id,
                                });
                              }
                            } else {
                              setneighborhoodId(neghberhoods[0].id);
                            }
                          }}
                          data={neghberhoods}
                          value={
                            activeSpace !== null
                              ? activeSpace.neighborhoodId
                              : neighborhoodId
                          }
                          defaultValue={
                            activeSpace !== null
                              ? activeSpace.neighborhoodId
                              : neighborhoodId
                          }
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
                          value={
                            activeSpace !== null ? activeSpace.street : street
                          }
                          onChange={(e) => {
                            setStreet(e.target.value);
                            if (activeSpace !== null) {
                              setActiveSpace({
                                ...activeSpace,
                                street: e.target.value,
                              });
                            }
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
                          value={
                            activeSpace !== null ? activeSpace.plaque : plaque
                          }
                          onChange={(e) => {
                            setPlaque(e.target.value);
                            if (activeSpace !== null) {
                              setActiveSpace({
                                ...activeSpace,
                                plaque: e.target.value,
                              });
                            }
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
                          value={
                            activeSpace !== null
                              ? activeSpace.floorNumber
                              : floorNumber
                          }
                          onChange={(e) => {
                            setFloorNumber(e.target.value);
                            if (activeSpace !== null) {
                              setActiveSpace({
                                ...activeSpace,
                                floorNumber: e.target.value,
                              });
                            }
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
                          value={
                            activeSpace !== null
                              ? activeSpace.postalCode
                              : postalCode
                          }
                          onChange={(e) => {
                            setPostalCode(e.target.value);
                            if (activeSpace !== null) {
                              setActiveSpace({
                                ...activeSpace,
                                postalCode: e.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions className="!pt-4 border-t border-t-gray-300 !justify-between">
          <Button
            autoFocus
            onClick={(e) => (level === 1 ? handleClose() : setLevel(1))}
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
      <div className="grid grid-cols-1 w-full gap-4  md:grid-cols-12">
        {addresses === "undefined" || addresses?.length === 0 ? (
          <div className="text-center col-span-12">
            <svg
              width="400"
              height="400"
              className="mx-auto mb-4"
              viewBox="0 0 1062 870"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="No Results">
                <g id="circle">
                  <path
                    id="Stroke 1"
                    d="M34.8164 399V408"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <g id="Group 8">
                    <path
                      id="Stroke 2"
                      d="M14.6016 403.875L21.9558 411.446"
                      stroke="#D2D8DF"
                      strokeWidth="2.921"
                      strokeLinecap="round"
                    />
                    <path
                      id="Stroke 4"
                      d="M6 424.028H16.3989"
                      stroke="#D2D8DF"
                      strokeWidth="2.921"
                      strokeLinecap="round"
                    />
                    <path
                      id="Stroke 6"
                      d="M13.7578 444.539L21.1121 436.969"
                      stroke="#D2D8DF"
                      strokeWidth="2.921"
                      strokeLinecap="round"
                    />
                  </g>
                  <path
                    id="Stroke 9"
                    d="M34.8164 447V438"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <path
                    id="Stroke 10"
                    d="M49.8164 441L43.8164 435"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <path
                    id="Stroke 11"
                    d="M61.8164 426H52.8164"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <path
                    id="Stroke 12"
                    d="M55.8164 405L49.8164 411"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <path
                    id="Stroke 13"
                    d="M517.816 6V12"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <path
                    id="Stroke 15"
                    d="M499.816 24H505.816"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <path
                    id="Stroke 16"
                    d="M517.816 42V36"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <path
                    id="Stroke 17"
                    d="M532.816 24H526.816"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <path
                    id="Stroke 18"
                    d="M169.816 258V267"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <path
                    id="Stroke 19"
                    d="M142.816 285H151.816"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <path
                    id="Stroke 20"
                    d="M169.816 309V300"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <path
                    id="Stroke 21"
                    d="M193.816 285H184.816"
                    stroke="#D2D8DF"
                    strokeWidth="2.921"
                    strokeLinecap="round"
                  />
                  <g id="Group 42">
                    <path
                      id="Stroke 22"
                      d="M815.578 585.118C822.747 585.118 828.562 590.934 828.562 598.105C828.562 605.279 822.747 611.092 815.578 611.092C808.408 611.092 802.594 605.279 802.594 598.105"
                      stroke="#D2D8DF"
                      strokeWidth="2.921"
                      strokeLinecap="round"
                    />
                    <path
                      id="Fill 26"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M874.998 467.291C882.707 464.886 894.525 455.457 897.26 445.313C899.741 454.28 910.14 464.886 919.523 465.688C908.961 469.428 898.862 480.538 897.26 489.266C896.17 480.37 882.203 468.587 874.998 467.291Z"
                      fill="#EBECEE"
                    />
                    <path
                      id="Fill 28"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M83.6309 581.117C87.4868 579.914 93.393 575.201 94.7607 570.129C96.001 574.61 101.199 579.914 105.891 580.317C100.611 582.184 95.563 587.74 94.7607 592.104C94.2157 587.656 87.2321 581.764 83.6309 581.117Z"
                      fill="#EBECEE"
                    />
                    <path
                      id="Fill 30"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M155.188 163.791C155.188 169.355 150.68 173.862 145.121 173.862C139.558 173.862 135.053 169.355 135.053 163.791C135.053 158.23 139.558 153.721 145.121 153.721C150.68 153.721 155.188 158.23 155.188 163.791Z"
                      fill="#D1D8DF"
                    />
                    <path
                      id="Fill 32"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M827.473 190.832C827.473 200.128 819.937 207.664 810.646 207.664C801.35 207.664 793.816 200.128 793.816 190.832C793.816 181.536 801.35 174 810.646 174C819.937 174 827.473 181.536 827.473 190.832Z"
                      fill="#EBECEE"
                    />
                    <path
                      id="Fill 34"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1060.56 145.229C1060.56 152.604 1054.58 158.581 1047.21 158.581C1039.84 158.581 1033.86 152.604 1033.86 145.229C1033.86 137.854 1039.84 131.877 1047.21 131.877C1054.58 131.877 1060.56 137.854 1060.56 145.229Z"
                      fill="#EBECEE"
                    />
                    <path
                      id="Stroke 36"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M343.347 768.803C343.347 773.452 339.58 777.22 334.932 777.22C330.286 777.22 326.52 773.452 326.52 768.803C326.52 764.154 330.286 760.386 334.932 760.386C339.58 760.386 343.347 764.154 343.347 768.803Z"
                      stroke="#D2D8DF"
                      strokeWidth="2.921"
                      strokeLinecap="round"
                    />
                    <path
                      id="Stroke 38"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M338.341 99.0952C338.341 104.659 333.833 109.166 328.273 109.166C322.713 109.166 318.205 104.659 318.205 99.0952C318.205 93.5339 322.713 89.0248 328.273 89.0248C333.833 89.0248 338.341 93.5339 338.341 99.0952Z"
                      stroke="#D2D8DF"
                      strokeWidth="2.921"
                      strokeLinecap="round"
                    />
                    <path
                      id="Stroke 40"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M595.149 862.009C588.716 864.457 581.516 861.224 579.068 854.792C576.621 848.356 579.85 841.152 586.286 838.706C592.717 836.258 599.917 839.488 602.364 845.924C604.814 852.359 601.582 859.561 595.149 862.009Z"
                      stroke="#D2D8DF"
                      strokeWidth="2.921"
                      strokeLinecap="round"
                    />
                  </g>
                </g>
                <g id="search">
                  <g id="documents">
                    <path
                      id="Fill 1"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M591.314 624H345.3C327.984 624 313.811 609.784 313.811 592.41V241.582C313.811 224.209 327.984 210 345.3 210H591.314C608.637 210 622.811 224.209 622.811 241.582V592.41C622.811 609.784 608.637 624 591.314 624Z"
                      fill="#E0E2EE"
                    />
                    <path
                      id="Fill 3"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M570.314 639H324.3C306.984 639 292.811 624.784 292.811 607.41V256.582C292.811 239.209 306.984 225 324.3 225H570.314C587.637 225 601.811 239.209 601.811 256.582V607.41C601.811 624.784 587.637 639 570.314 639Z"
                      fill="#E8EBF2"
                    />
                    <path
                      id="Fill 5"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M549.888 650.842H303.365C286.014 650.842 271.811 636.685 271.811 619.383V270.008C271.811 252.706 286.014 238.556 303.365 238.556H549.888C567.246 238.556 581.449 252.706 581.449 270.008V619.383C581.449 636.685 567.246 650.842 549.888 650.842Z"
                      fill="#D8DBEA"
                    />
                    <path
                      id="Fill 8"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M549.888 650.842H303.365C286.014 650.842 271.811 636.685 271.811 619.383V270.008C271.811 252.706 286.014 238.556 303.365 238.556H549.888C567.246 238.556 581.449 252.706 581.449 270.008V619.383C581.449 636.685 567.246 650.842 549.888 650.842Z"
                      fill="#F1F2F7"
                    />
                    <path
                      id="Fill 11"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M514.354 345H332.267C327.067 345 322.811 340.951 322.811 336.003C322.811 331.049 327.067 327 332.267 327H514.354C519.554 327 523.811 331.049 523.811 336.003C523.811 340.951 519.554 345 514.354 345Z"
                      fill="#E0E2EE"
                    />
                    <path
                      id="Fill 13"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M514.354 399H332.267C327.067 399 322.811 394.951 322.811 390.003C322.811 385.049 327.067 381 332.267 381H514.354C519.554 381 523.811 385.049 523.811 390.003C523.811 394.951 519.554 399 514.354 399Z"
                      fill="#E0E2EE"
                    />
                    <path
                      id="Fill 15"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M514.354 453H332.267C327.067 453 322.811 448.951 322.811 444.003C322.811 439.056 327.067 435 332.267 435H514.354C519.554 435 523.811 439.056 523.811 444.003C523.811 448.951 519.554 453 514.354 453Z"
                      fill="#E0E2EE"
                    />
                    <path
                      id="Fill 17"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M514.354 507H332.267C327.067 507 322.811 502.951 322.811 498.003C322.811 493.049 327.067 489 332.267 489H514.354C519.554 489 523.811 493.049 523.811 498.003C523.811 502.951 519.554 507 514.354 507Z"
                      fill="#E0E2EE"
                    />
                    <path
                      id="Fill 19"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M427.314 561H332.308C327.085 561 322.811 556.951 322.811 552.003C322.811 547.049 327.085 543 332.308 543H427.314C432.536 543 436.811 547.049 436.811 552.003C436.811 556.951 432.536 561 427.314 561Z"
                      fill="#E0E2EE"
                    />
                  </g>
                  <g id="search_2">
                    <path
                      id="Fill 21"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M619.075 491.21C582.665 527.614 526.298 531.721 485.376 503.615C480.146 499.958 475.168 495.851 470.526 491.21C468.136 488.829 465.884 486.371 463.762 483.783C459.517 478.615 455.799 473.104 452.752 467.409C447.385 457.791 443.736 447.585 441.743 437.036C435.315 403.952 444.927 368.342 470.526 342.755C496.187 317.091 531.803 307.542 564.892 313.908C575.435 315.962 585.651 319.61 595.27 324.916C600.973 328.03 606.409 331.748 611.586 335.992C614.166 338.106 616.625 340.366 619.007 342.755C623.656 347.396 627.825 352.366 631.413 357.602C659.532 398.51 655.417 454.875 619.075 491.21Z"
                      fill="white"
                      fill-opacity="0.1"
                    />
                    <path
                      id="Fill 23"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M608.887 484.041C571.007 521.927 509.62 521.92 471.733 484.041C433.896 446.203 433.896 384.809 471.783 346.929C509.62 309.091 571.007 309.091 608.845 346.929C646.725 384.809 646.725 446.203 608.887 484.041ZM628.327 327.467C579.705 278.844 500.915 278.844 452.293 327.467C403.678 376.082 403.636 454.921 452.251 503.543C496.502 547.781 565.862 551.771 614.646 515.449C619.411 511.896 623.999 507.914 628.377 503.543C632.747 499.166 636.729 494.577 640.275 489.813C676.597 441.021 672.572 371.711 628.327 327.467Z"
                      fill="#E0E2EE"
                    />
                    <path
                      id="Fill 25"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M819.677 686.825L817.636 688.866C804.131 702.378 782.016 702.378 768.505 688.866L643.811 564.172L694.983 513L819.677 637.694C833.188 651.206 833.188 673.313 819.677 686.825"
                      fill="url(#paint0_linear_48_5980)"
                    />
                    <path
                      id="Fill 27"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M642.963 486L679.811 522.848L653.651 549L616.811 512.152C621.673 508.527 626.348 504.463 630.822 500.004C635.281 495.545 639.345 490.862 642.963 486Z"
                      fill="#E0E2EE"
                    />
                    <path
                      id="Fill 29"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M817.811 636.161L766.964 687L757.811 677.839L808.65 627L817.811 636.161Z"
                      fill="#005C37"
                    />
                    <path
                      id="Fill 31"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M697.811 514.76L645.572 567L637.811 559.24L690.049 507L697.811 514.76Z"
                      fill="url(#paint1_linear_48_5980)"
                    />
                    <path
                      id="Fill 33"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M583.811 333.896L455.7 462C450.875 453.353 447.595 444.178 445.811 434.694L556.503 324C565.981 325.853 575.163 329.126 583.811 333.896Z"
                      fill="white"
                      fill-opacity="0.5"
                    />
                    <path
                      id="Fill 35"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M625.811 364.345L487.309 495C482.349 491.735 477.628 488.06 473.226 483.907C470.96 481.769 468.816 479.576 466.811 477.26L606.999 345C609.454 346.899 611.785 348.921 614.044 351.059C618.447 355.212 622.407 359.659 625.811 364.345Z"
                      fill="white"
                      fill-opacity="0.5"
                    />
                  </g>
                </g>
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_48_5980"
                  x1="736.811"
                  y1="420"
                  x2="550.811"
                  y2="606"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#20AC73" />
                  <stop offset="0.35" stop-color="#199060" />
                  <stop offset="1" stop-color="#0C5C3C" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_48_5980"
                  x1="667.811"
                  y1="477"
                  x2="607.811"
                  y2="537"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#005C37" />
                  <stop offset="1" stop-color="#014027" />
                </linearGradient>
              </defs>
            </svg>
            <h3 className="text-3xl peyda">آدرسی پیدا نشد</h3>
          </div>
        ) : (
          addresses?.map((value) => (
            <div
              key={value.id}
              className="col-span-4 w-full border border-gray-200 rounded-2xl p-4 "
            >
              <div className="flex justify-between mb-4">
                <span className="font-bold text-primary"> {value.name}</span>
                <span className="cursor-pointer">
                  <div className="flex flex-col gap-2">
                    <span
                      className="flex justify-end"
                      onClick={(e) => deleteOrder(value.id)}
                    >
                      <Trash />
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={(e) => EditAddress(value.id)}
                    >
                      <Edit />
                    </span>
                  </div>
                </span>
              </div>
              <div className="text-sm leading-7">
                <span>خیابان {value.street}</span>{" "}
                <span>کوچه {value.alley}</span>{" "}
                <span>طبقه {value.floorNumber}</span>{" "}
                <span>پلاک {value.plaque}</span>{" "}
                <span>کد پستی {value.postalCode}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
