"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "../../../../../components/global/loading";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { pageTitle } from "../../../../layout";
import MapComponent from "@/app/components/global/Map";
import SaveBar from "@/app/components/global/SaveBar";

export default function VendorAddress({ params }) {
  const [title, setTitle] = useAtom(pageTitle);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  useEffect(() => {
    setTitle({
      title: "افزودن آدرس جدید",
      buttonTitle: "",
      link: "",
    });
  }, []);

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
  const router = useRouter();
  const { data: provinces, isLoading: provincesIsLoading } = useFetcher(
    `/v1/api/ecommerce/provinces`,
    "GET"
  );

  const getCities = async (pid) => {
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
  };

  const getNeighberhoods = async (nid) => {
    if (neighborhoodId !== null) {
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
    }
  };

  useEffect(() => {
    getCities(provinceId);
  }, [provinces]);

  useEffect(() => {
    getCities(provinceId);
    getNeighberhoods(cityId);
  }, [provinceId]);

  // useEffect(() => {
  //
  //   getNeighberhoods(neighborhoodId);
  // }, [neighborhoodId]);

  const save = async () => {
    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/vendorAddresses",
        method: "POST",
        body: {
          vendorId: +params.id,
          name: name,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
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
      setTimeout(() => {
        router.push("/admin/ecommerce/vendorAddresses");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (provincesIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <MapComponent coordinates={coordinates} setCoordinates={setCoordinates} />
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
              {provinces.result.map((value, key) => (
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

      <SaveBar action={save} />
    </div>
  );
}
