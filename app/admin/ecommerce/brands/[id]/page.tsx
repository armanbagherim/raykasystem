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

export default function Brands({ params }) {
  const [title, setTitle] = useAtom(pageTitle);

  const {
    data: brandData,
    isLoading: brandIsLoading,
    error: brandError,
  } = useFetcher(`/v1/api/ecommerce/brands/${params.id}`, "GET");

  useEffect(() => {
    setTitle({
      title: "ویرایش برند",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const router = useRouter();

  useEffect(() => {
    if (brandIsLoading === false) {
      setName(brandData.result.name);
      setSlug(brandData.result.slug);
    }
  }, [brandIsLoading]);

  const save = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/brands/${params.id}`,
        method: "PUT",
        body: {
          name,
          slug,
        },
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/brands");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (brandIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          نام برند
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          لینک برند
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>

      <SaveBar action={save} backUrl={"/admin/ecommerce/brands/"} />
    </div>
  );
}
