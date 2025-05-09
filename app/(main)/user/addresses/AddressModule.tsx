"use client";
import { Edit, EmptyAddresses, PlusSmall, Trash } from "@/app/components/design/Icons";
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
import React, { useEffect, useState } from "react";
import MapClient from "@/app/components/global/MapClient";
import { fetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import SearchSelect from "@/app/components/global/SearchSelect";
import Swal from "sweetalert2";

export default function AddressModule({ cookies, session }) {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [level, setLevel] = useState(1);
  const [errors, setErrors] = useState({});
  const NESHAN_API_KEY = "service.8cc8247dd8a4495bb5d7fdadbc278ed2";

  const defaultCoordinates = {
    latitude: "35.65326",
    longitude: "51.35471",
  };

  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const [address, setAddress] = useState({
    name: "",
    provinceId: 1,
    cityId: 1,
    neighborhoodId: null,
    street: "",
    plaque: "",
    floorNumber: "",
    postalCode: "",
    coordinates: defaultCoordinates,
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [activeSpace, setActiveSpace] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setLevel(1);
    setAddress({
      name: "",
      provinceId: 1,
      cityId: 1,
      neighborhoodId: null,
      street: "",
      plaque: "",
      floorNumber: "",
      postalCode: "",
      coordinates: defaultCoordinates,
    });
    setCoordinates(null);
    setActiveSpace(null);
    setErrors({});
  };

  const handleClose = () => {
    setOpen(false);
    setLevel(1);
    setActiveSpace(null);
    setCoordinates(null);
    setErrors({});
    setAddress({
      name: "",
      provinceId: 1,
      cityId: 1,
      neighborhoodId: null,
      street: "",
      plaque: "",
      floorNumber: "",
      postalCode: "",
      coordinates: defaultCoordinates,
    });
  };

  const getAddress = async () => {
    setLoading(true);
    if (!session?.token) {
      setLoading(false);
      return;
    }
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
        .then((res) => res.json())
        .then((data) => {
          setAddresses(data.result || []);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setLoading(false);
    }
  };

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
      setCities(res.result);
      setAddress((prev) => ({
        ...prev,
        cityId: res.result[0]?.id || 1,
        // Preserve neighborhoodId unless explicitly resetting
      }));
      setFetchingData(false);
    });
  };

  const getNeighborhoods = async (cid) => {
    setFetchingData(true);
    await fetcher({
      url: `/v1/api/ecommerce/neighborhoods?cityId=${cid}`,
      method: "GET",
    }).then((res) => {
      if (res.result.length > 0) {
        setNeighborhoods(res.result);
        // Only set neighborhoodId to null if it doesn't match any neighborhood in the new list
        setAddress((prev) => {
          const isValidNeighborhood = res.result.some(
            (n) => n.id === prev.neighborhoodId
          );
          return {
            ...prev,
            neighborhoodId: isValidNeighborhood ? prev.neighborhoodId : null,
          };
        });
      } else {
        setNeighborhoods([]);
        setAddress((prev) => ({
          ...prev,
          neighborhoodId: null,
        }));
      }
      setFetchingData(false);
    });
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (address.provinceId) {
      getCities(address.provinceId);
    }
  }, [address.provinceId]);

  useEffect(() => {
    if (address.cityId) {
      getNeighborhoods(address.cityId);
    }
  }, [address.cityId]);

  useEffect(() => {
    if (!open) {
      setLevel(1);
      setErrors({});
      setAddress({
        name: "",
        provinceId: 1,
        cityId: 1,
        neighborhoodId: null,
        street: "",
        plaque: "",
        floorNumber: "",
        postalCode: "",
        coordinates: defaultCoordinates,
      });
      setCoordinates(null);
    }
  }, [open]);

  useEffect(() => {
    if (coordinates?.latitude && coordinates?.longitude) {
      setAddress((prev) => ({
        ...prev,
        coordinates: coordinates,
      }));
      if (address.provinceId === 8 && address.cityId === 215) {
        getAddressFromCoordinates(coordinates.latitude, coordinates.longitude);
      }
    }
  }, [coordinates]);

  useEffect(() => {
    getAddress();
  }, [session]);

  // Debug address.neighborhoodId after state updates
  useEffect(() => {
    console.log("Updated address.neighborhoodId:", address.neighborhoodId);
  }, [address.neighborhoodId]);

  const validateStep1 = () => {
    const newErrors = {};
    if (!address.provinceId) newErrors.provinceId = "استان الزامی است.";
    if (!address.cityId) newErrors.cityId = "شهر الزامی است.";

    const isTehran = address.provinceId === 8 && address.cityId === 215;
    if (isTehran) {
      if (!coordinates?.latitude || !coordinates?.longitude) {
        newErrors.coordinates = "موقعیت مکانی برای تهران الزامی است.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!address.name) newErrors.name = "نام آدرس الزامی است.";
    if (!address.street) newErrors.street = "آدرس خیابان الزامی است.";
    if (!address.plaque) newErrors.plaque = "پلاک الزامی است.";
    if (!address.floorNumber) newErrors.floorNumber = "طبقه الزامی است.";
    if (!address.postalCode) {
      newErrors.postalCode = "کد پستی الزامی است.";
    } else if (!/^\d{10}$/.test(address.postalCode)) {
      newErrors.postalCode = "کد پستی باید ۱۰ رقمی باشد.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkLocation = () => {
    if (!validateStep1()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLevel(2);
    }, 1000);
  };

  const save = async () => {
    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      const addressToSend = {
        name: address.name,
        latitude: address.coordinates.latitude,
        longitude: address.coordinates.longitude,
        provinceId: +address.provinceId,
        cityId: +address.cityId,
        neighborhoodId: address.neighborhoodId ? +address.neighborhoodId : null,
        street: address.street,
        plaque: address.plaque,
        floorNumber: address.floorNumber,
        postalCode: address.postalCode,
      };

      if (activeSpace) {
        await fetcher({
          url: `/v1/api/ecommerce/user/addresses/${activeSpace.id}`,
          method: "PUT",
          body: addressToSend,
        });
      } else {
        await fetcher({
          url: `/v1/api/ecommerce/user/addresses`,
          method: "POST",
          body: addressToSend,
        });
      }

      toast.success("موفق");
      setIsLoading(false);
      setOpen(false);
      setLevel(1);
      setActiveSpace(null);
      getAddress();
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

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
        await fetcher({
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

  const editAddress = (id) => {
    const selectedAddress = addresses.find((value) => value.id === id);
    console.log("Selected Address:", selectedAddress);
    setActiveSpace(selectedAddress);
    setAddress({
      name: selectedAddress.name,
      provinceId: selectedAddress.provinceId,
      cityId: selectedAddress.cityId,
      neighborhoodId: selectedAddress.neighborhoodId ?? null,
      street: selectedAddress.street,
      plaque: selectedAddress.plaque,
      floorNumber: selectedAddress.floorNumber,
      postalCode: selectedAddress.postalCode,
      coordinates: {
        latitude: selectedAddress.latitude,
        longitude: selectedAddress.longitude,
      },
    });
    setCoordinates({
      latitude: selectedAddress.latitude,
      longitude: selectedAddress.longitude,
    });
    setLevel(1);
    setOpen(true);
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
        {
          headers: {
            "Api-Key": NESHAN_API_KEY,
          },
        }
      );
      const data = await response.json();
      if (data.status === "OK" && data.formatted_address) {
        setAddress((prev) => ({
          ...prev,
          street: data.formatted_address,
        }));
        if (activeSpace) {
          setActiveSpace((prev) => ({
            ...prev,
            street: data.formatted_address,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching address from coordinates:", error);
    }
  };

  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (activeSpace) {
      setActiveSpace((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const convertToEnglishDigits = (str) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return str
      .split("")
      .map((char) => {
        const index = persianDigits.indexOf(char);
        return index !== -1 ? englishDigits[index] : char;
      })
      .join("");
  };

  const handleFieldChange = (field, value) => {
    const convertedValue = convertToEnglishDigits(value);
    handleAddressChange(field, convertedValue);
  };

  const shouldShowMap = address.provinceId === 8 && address.cityId === 215;

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
        <DialogTitle id="responsive-dialog-title">
          {activeSpace ? "ویرایش آدرس" : "ثبت آدرس جدید"}
        </DialogTitle>
        <DialogContent className="w-full md:w-[600px]">
          {fetchingData ? (
            <div className="w-full h-full absolute z-[99999] top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-white">
              <CircularProgress />
            </div>
          ) : (
            <DialogContentText>
              <div>
                {level === 1 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        {provinces && (
                          <SearchSelect
                            onChange={(e) => {
                              handleAddressChange("provinceId", e?.id || 1);
                            }}
                            data={provinces}
                            value={address.provinceId}
                            defaultValue={address.provinceId}
                            isDiff={true}
                            diffName="name"
                            label="استان"
                            error={!!errors.provinceId}
                            helperText={errors.provinceId}
                          />
                        )}
                      </div>
                      <div>
                        {cities && (
                          <SearchSelect
                            onChange={(e) => {
                              handleAddressChange("cityId", e?.id || cities[0]?.id);
                            }}
                            data={cities}
                            value={address.cityId}
                            defaultValue={address.cityId}
                            isDiff={true}
                            diffName="name"
                            label="شهر"
                            error={!!errors.cityId}
                            helperText={errors.cityId}
                          />
                        )}
                      </div>
                    </div>
                    {shouldShowMap && (
                      <MapClient
                        height={400}
                        defaultLocation={{
                          lat: coordinates?.latitude
                            ? parseFloat(coordinates.latitude)
                            : parseFloat(defaultCoordinates.latitude),
                          lng: coordinates?.longitude
                            ? parseFloat(coordinates.longitude)
                            : parseFloat(defaultCoordinates.longitude),
                        }}
                        onLocationChange={(location) => {
                          setCoordinates({
                            latitude: location.lat.toString(),
                            longitude: location.lng.toString(),
                          });
                        }}
                      />
                    )}
                    {errors.coordinates && (
                      <p className="text-red-500 text-sm mt-2">{errors.coordinates}</p>
                    )}
                  </>
                ) : (
                  <div>
                    <div className="mb-8 mt-4">
                      <TextField
                        type="text"
                        id="name"
                        className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        label="نام آدرس: مثال خانه"
                        value={address.name}
                        fullWidth
                        variant="outlined"
                        onChange={(e) => {
                          handleAddressChange("name", e.target.value);
                        }}
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      {neighborhoods && neighborhoods.length > 0 && (
                        <SearchSelect
                          nullable={true}
                          onChange={(e) => {
                            handleAddressChange("neighborhoodId", e?.id || null);
                          }}
                          data={neighborhoods}
                          value={address.neighborhoodId}
                          defaultValue={address.neighborhoodId}
                          isDiff={true}
                          diffName="name"
                          label="محله"
                        />
                      )}
                    </div>
                    <div className="flex gap-4 mb-6">
                      <div className="w-full flex-1">
                        <TextField
                          type="text"
                          variant="outlined"
                          id="street"
                          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                          label="آدرس"
                          fullWidth
                          value={address.street}
                          onChange={(e) => {
                            handleAddressChange("street", e.target.value);
                          }}
                          error={!!errors.street}
                          helperText={errors.street}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <TextField
                          type="text"
                          variant="outlined"
                          id="plaque"
                          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                          label="پلاک"
                          value={address.plaque}
                          onChange={(e) => {
                            handleFieldChange("plaque", e.target.value);
                          }}
                          error={!!errors.plaque}
                          helperText={errors.plaque}
                        />
                      </div>
                      <div className="flex-1">
                        <TextField
                          type="text"
                          variant="outlined"
                          id="floorNumber"
                          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                          label="طبقه"
                          value={address.floorNumber}
                          onChange={(e) => {
                            handleFieldChange("floorNumber", e.target.value);
                          }}
                          error={!!errors.floorNumber}
                          helperText={errors.floorNumber}
                        />
                      </div>
                      <div className="flex-1">
                        <TextField
                          type="text"
                          variant="outlined"
                          id="postalCode"
                          className="bg-gray-50 border border-gray-300 text-gray-900 mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                          label="کد پستی"
                          value={address.postalCode}
                          onChange={(e) => {
                            handleFieldChange("postalCode", e.target.value);
                          }}
                          error={!!errors.postalCode}
                          helperText={errors.postalCode}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions className="!pt-4 border-t border-t-gray-200 !justify-between">
          <Button
            autoFocus
            onClick={() => (level === 1 ? handleClose() : setLevel(1))}
          >
            {level === 1 ? "انصراف" : "مرحله قبل"}
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={level === 1 ? checkLocation : save}
            autoFocus
            disabled={
              isLoading ||
              (address.provinceId === 8 &&
                address.cityId === 215 &&
                (!coordinates?.latitude || !coordinates?.longitude))
            }
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
      <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-12">
        {addresses.length === 0 ? (
          <div className="text-center col-span-12">
            <EmptyAddresses />
            <h3 className="text-3xl peyda">آدرسی پیدا نشد</h3>
          </div>
        ) : (
          addresses?.map((value) => (
            <div
              key={value.id}
              className="col-span-4 w-full border border-gray-200 rounded-2xl p-4"
            >
              <div className="flex justify-between mb-4">
                <span className="font-bold text-primary">{value.name}</span>
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
                      onClick={(e) => editAddress(value.id)}
                    >
                      <Edit />
                    </span>
                  </div>
                </span>
              </div>
              <div className="text-sm leading-7">
                <span>خیابان {value.street}</span>{" "}
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