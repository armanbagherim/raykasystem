"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { pageTitle } from "../../../../../layout";
import MapComponent from "@/app/components/global/Map";
import SaveBar from "@/app/components/global/SaveBar";
import MapClient from "@/app/components/global/MapClient";
import Loading from "@/app/components/global/loading";
import SearchSelect from "@/app/components/global/SearchSelect";
import { TextField } from "@mui/material";

export default function VendorAddress() {
  const [title, setTitle] = useAtom(pageTitle);
  const params = useParams();
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
  useEffect(() => {
    setTitle({
      title: "افزودن آدرس جدید",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const [provinces, setProvinces] = useState(null);
  const [provinceId, setprovinceId] = useState(null);
  const [neighborhoodId, setneighborhoodId] = useState(null);
  const [cities, setCities] = useState([]);
  const [neghberhoods, setNeighberhoods] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [street, setStreet] = useState();
  const [alley, setAlley] = useState();
  const [plaque, setPlaque] = useState();
  const [floorNumber, setFloorNumber] = useState();
  const [postalCode, setPostalCode] = useState();
  const router = useRouter();

  const { data: address, isLoading: addressIsLoading } = useFetcher(
    `/v1/api/ecommerce/vendorAddresses/${params.slug}`,
    "GET"
  );

  useEffect(() => {
    if (!addressIsLoading) {
      setStreet(address.result.address.street);
      setAlley(address.result.address.alley);
      setCityId(address.result.address.cityId);
      setprovinceId(address.result.address.provinceId);
      setneighborhoodId(address.result.address.neighborhoodId);
      setFloorNumber(address.result.address.floorNumber);
      setName(address.result.address.name);
      setPostalCode(address.result.address.postalCode);
      setPlaque(address.result.address.plaque);
      setCoordinates({
        latitude: address.result.address.latitude,
        longitude: address.result.address.longitude,
      });
    }
  }, [addressIsLoading]);

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

        if (address?.result?.address?.neighborhoodId !== neighborhoodId) {
          setneighborhoodId(res.result[0].id);
        }
      } else {
        setneighborhoodId(null);
        setNeighberhoods(null);
      }
    });
  };
  useEffect(() => {
    getProvinces();
  }, [addressIsLoading]);

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
        url: `/v1/api/ecommerce/vendorAddresses/${params.slug}`,
        method: "PUT",
        body: {
          vendorId: +params.id,
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
      setTimeout(() => {
        router.push(`/admin/ecommerce/vendoraddresses/${params.id}`);
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (addressIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      {coordinates.latitude !== null && (
        <MapClient
          height={400}
          defaultLocation={{
            lat: +coordinates.latitude,
            lng: +coordinates.longitude,
          }}
          onLocationChange={(location) => {
            setCoordinates({
              latitude: location.lat.toString(),
              longitude: location.lng.toString(),
            });
            setIsAddressManuallyChanged(false);
          }}
        />
      )}
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          نام
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
              onChange={(e) => setStreetAndUpdateAddress(e.target.value)}
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

      <SaveBar action={save} />
    </div>
  );
}
