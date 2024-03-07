"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { HexColorPicker } from "react-colorful";
import { pageTitle } from "@/app/admin/layout";
import Loading from "@/app/components/global/loading";

export default function page({ params }) {
  const [title, setTitle] = useAtom(pageTitle);
  useEffect(() => {
    setTitle({
      title: "ساخت دسته بندی",
      buttonTitle: "",
      link: "",
    });
  }, []);
  const [value, setValue] = useState();
  const router = useRouter();

  const {
    data: values,
    isLoading: valuesIsLoading,
    error: valuesError,
  } = useFetcher(`/v1/api/eav/admin/attributeValues/${params.valueId}`, "GET");
  useEffect(() => {
    if (valuesIsLoading === false) {
      setValue(values.result.value);
    }
  }, [valuesIsLoading]);
  const saveField = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/eav/admin/attributeValues/${params.valueId}`,
        method: "PUT",
        body: {
          value: value,
          attributeId: +params.id,
        },
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push(`/admin/eav/entityTypes/fields/${params.id}/values`);
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (valuesIsLoading) {
    return <Loading />;
  }
  return (
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
        placeholder="John"
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        onClick={saveField}
        className="bg-blue-700 text-white px-6 hover:bg-transparent hover:border hover:border-blue-700 hover:text-blue-700 transition-all py-3 border border-transparent rounded-xl"
      >
        ایجاد
      </button>
    </div>
  );
}
