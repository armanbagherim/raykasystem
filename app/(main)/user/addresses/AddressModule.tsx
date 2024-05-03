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
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import MapComponentClient from "@/app/components/global/MapClient";
import { fetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import MapClient from "@/app/components/global/MapClient";
import SearchSelect from "@/app/components/global/SearchSelect";

export default function AddressModule({ cookies, session }) {
  const [addresses, setAddresses] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getAddress = async () => {
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

  const setStreetAndUpdateAddress = (value) => {
    setStreet(value);
    setIsAddressManuallyChanged(true);
  };

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
      console.log(res.result.length);
      if (res.result.length !== 0) {
        setNeighberhoods(res.result);
        setneighborhoodId(res.result[0].id);
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

  const save = async () => {
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
      console.log(req);
      toast.success("موفق");
      getAddress();
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
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
            <div>
              <MapClient
                height={400}
                onAddressChange={(address) => {
                  if (!isAddressManuallyChanged) {
                    setStreetAndUpdateAddress(address);
                  }
                }}
                onLocationChange={(location) => {
                  setCoordinates({
                    latitude: location.lat.toString(),
                    longitude: location.lng.toString(),
                  });
                  setIsAddressManuallyChanged(false);
                }}
              />
              <div className="">
                <div className="mb-8">
                  <TextField
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    label="نام آدرس"
                    value={name}
                    fullWidth
                    variant="standard"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    {provinces && (
                      <SearchSelect
                        onChange={(e) =>
                          e !== null ? setprovinceId(e.id) : setprovinceId(1)
                        }
                        data={provinces}
                        value={provinceId}
                        defaultValue={provinceId}
                        isDiff={true}
                        diffName="name"
                        label="استان"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    {cities && (
                      <SearchSelect
                        onChange={(e) =>
                          e !== null ? setCityId(e.id) : setCityId(cities[0].id)
                        }
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
                      onChange={(e) =>
                        e !== null
                          ? setneighborhoodId(e.id)
                          : setneighborhoodId(neghberhoods[0].id)
                      }
                      data={neghberhoods}
                      value={neighborhoodId}
                      defaultValue={neighborhoodId}
                      // isDiff={true}
                      // diffName="name"
                      label="محله"
                    />
                  )}
                </div>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <TextField
                      type="text"
                      variant="standard"
                      id="first_name"
                      className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      required
                      label="خیابان"
                      value={street}
                      onChange={(e) =>
                        setStreetAndUpdateAddress(e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <TextField
                      type="text"
                      variant="standard"
                      label="کوچه"
                      id="first_name"
                      className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      required
                      value={alley}
                      onChange={(e) => setAlley(e.target.value)}
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
                      onChange={(e) => setPlaque(e.target.value)}
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
                      onChange={(e) => setFloorNumber(e.target.value)}
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
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
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
      <div className="grid grid-cols-1 w-full gap-4  md:grid-cols-12">
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
    // </CacheProvider>
  );
}
