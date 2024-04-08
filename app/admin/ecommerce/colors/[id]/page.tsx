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

export default function Colors({ params }) {
  const [title, setTitle] = useAtom(pageTitle);
  const {
    data: colorData,
    isLoading: colorIsLoading,
    error: colorError,
  } = useFetcher(`/v1/api/ecommerce/colors/${params.id}`, "GET");

  useEffect(() => {
    setTitle({
      title: "ویرایش رنگ",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [colorName, setColorName] = useState();
  const [colorCode, setColorCode] = useState();

  useEffect(() => {
    if (colorIsLoading === false) {
      setColorName(colorData.result.name);
      setColorCode(colorData.result.hexCode);
    }
  }, [colorIsLoading]);
  const router = useRouter();

  const save = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/colors/${params.id}`,
        method: "PUT",
        body: {
          name: colorName,
          hexCode: colorCode,
        },
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/colors");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (colorIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          نام رنگ
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
          onChange={(e) => setColorName(e.target.value)}
          value={colorName}
        />
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          کد رنگ
        </label>
      </div>
      <HexColorPicker
        className="mb-5"
        color={colorCode}
        onChange={setColorCode}
      />
      <SaveBar action={save} />
    </div>
  );
}
