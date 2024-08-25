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
import dynamic from "next/dynamic";
import ChangeToNull from "@/app/components/global/ChangeToNull";
const SeoBox = dynamic(
  () => import("@/app/admin/ecommerce/products/_components/SeoBox"),
  { ssr: false }
);
export default function Eav() {
  const [titles, setTitles] = useAtom(pageTitle);

  useEffect(() => {
    setTitles({
      title: "افزودن دسته جدید",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [title, setTitle] = useState();
  const [slug, setSlug] = useState();
  const [metaDescription, setMetaDescription] = useState();
  const [metaKeywords, setMetaKeywords] = useState();
  const [metaTitle, setMetaTitle] = useState();
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState();

  const router = useRouter();

  const save = async () => {
    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/admin/selectedProducts",
        method: "POST",
        body: {
          title,
          slug,
          metaKeywords,
          description,
          selectedProductTypeId: 1,
          metaDescription,
          metaTitle,
          priority: priority === "null" ? null : +priority,
        },
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/selectedProducts/new");
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
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
          onChange={(e) => setTitle(e.target.value)}
        />
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          لینک
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">توضیحات</label>
        <SeoBox setDescription={setDescription} description={description} />
      </div>

      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        اولویت
      </label>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        required
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        عنوان سئو
      </label>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        required
        value={metaTitle}
        onChange={(e) => setMetaTitle(e.target.value)}
      />
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        توضیحات سئو
      </label>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        required
        value={metaDescription}
        onChange={(e) => setMetaDescription(e.target.value)}
      />

      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        کلمات کلیدی (با کاما جدا شود)
      </label>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        required
        value={metaKeywords}
        onChange={(e) => setMetaKeywords(e.target.value)}
      />
      <SaveBar action={save} backUrl={"/admin/eav/entityTypes/"} />
    </div>
  );
}
