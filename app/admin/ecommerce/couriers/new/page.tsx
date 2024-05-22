"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "../../../../components/global/loading";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { pageTitle } from "../../../layout";
import { HexColorPicker } from "react-colorful";
import SaveBar from "@/app/components/global/SaveBar";

export default function Brands() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "افزودن پیک جدید",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const router = useRouter();

  const save = async () => {
    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/admin/couriers",
        method: "POST",
        body: {
          firstname,
          lastname,
          phoneNumber,
        },
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/couriers");
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div>
        <div className="flex gap-4">
          <div className="flex-1 w-full">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              نام پیک
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="flex-1 w-full">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              نام خانوادگی پیک
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
        </div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          شماره موبایل
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <SaveBar action={save} backUrl={"/admin/ecommerce/brands/"} />
    </div>
  );
}
