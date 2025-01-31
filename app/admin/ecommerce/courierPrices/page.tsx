"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "../../../components/global/loading";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import SaveBar from "@/app/components/global/SaveBar";

export default function CourierPrice() {
  const params = useParams();
  const [title, setTitle] = useAtom(pageTitle);
  const {
    data: courierPricesData,
    isLoading: courierPricesIsLoading,
    error: courierPricesError,
  } = useFetcher(`/v1/api/ecommerce/admin/courierPrices/price`, "GET");

  useEffect(() => {
    setTitle({
      title: "نرخ پستی",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [baseCourierPrice, setBaseCourierPrice] = useState();
  const [courierPriceByKilometre, setCourierPriceByKilometre] = useState();

  useEffect(() => {
    if (courierPricesIsLoading === false) {
      setBaseCourierPrice(courierPricesData.result.baseCourierPrice);
      setCourierPriceByKilometre(
        courierPricesData.result.courierPriceByKilometer
      );
    }
  }, [courierPricesIsLoading]);
  const router = useRouter();

  const save = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/courierPrices/price`,
        method: "PUT",
        body: {
          baseCourierPrice: +baseCourierPrice,
          courierPriceByKilometre: +courierPriceByKilometre,
        },
      });
      toast.success("موفق");
      //   setTimeout(() => {
      //     router.push("/admin/ecommerce/courierPrices");
      //   }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (courierPricesIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          نرخ پایه پیک
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          onChange={(e) => setBaseCourierPrice(e.target.value)}
          value={baseCourierPrice}
        />
        <div className="mb-10">{Number(baseCourierPrice).toLocaleString()}</div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          نرخ اضافه بر کیلومتر
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-4 border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          onChange={(e) => setCourierPriceByKilometre(e.target.value)}
          value={courierPriceByKilometre}
        />
        <div className="mb-10">
          {Number(courierPriceByKilometre).toLocaleString()}
        </div>
      </div>

      <SaveBar action={save} backUrl={"/admin/ecommerce/courierPricess/"} />
    </div>
  );
}
