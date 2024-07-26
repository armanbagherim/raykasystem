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
import ChangeToNull from "@/app/components/global/ChangeToNull";
import SeoBox from "../../products/_components/SeoBox";

export default function Brands({ params }) {
  const [title, setTitle] = useAtom(pageTitle);

  const { data: pageData, isLoading: pageIsLoading } = useFetcher(
    `/v1/api/ecommerce/admin/pages/${params.id}`,
    "GET"
  );

  useEffect(() => {
    setTitle({
      title: "ویرایش برگه",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const [metaDescription, setMetaDescription] = useState();
  const [description, setDescription] = useState();
  const [metaKeywords, setMetaKeywords] = useState();
  const [metaTitle, setMetaTitle] = useState();
  const router = useRouter();

  useEffect(() => {
    if (pageIsLoading === false) {
      setName(pageData.result.title);
      setSlug(pageData.result.slug);
      setDescription(pageData.result.description);
      setMetaDescription(pageData.result.metaDescription);
      setMetaKeywords(pageData.result.metaKeywords);
      setMetaTitle(pageData.result.metaTitle);
    }
  }, [pageIsLoading]);

  const save = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/pages/${params.id}`,
        method: "PUT",
        body: {
          title: name,
          slug,
          description,
          metaKeywords,
          metaDescription,
          metaTitle,
        },
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/pages");
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (pageIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          نام برگه
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          value={name}
          onChange={(e) => setName(ChangeToNull(e.target.value))}
        />
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          لینک برگه
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          value={slug}
          onChange={(e) => setSlug(ChangeToNull(e.target.value))}
        />
      </div>
      <label htmlFor="">توضیحات</label>
      <SeoBox description={description} setDescription={setDescription} />
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
        onChange={(e) => setMetaTitle(ChangeToNull(e.target.value))}
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
        onChange={(e) => setMetaDescription(ChangeToNull(e.target.value))}
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
        onChange={(e) => setMetaKeywords(ChangeToNull(e.target.value))}
      />
      <SaveBar action={save} backUrl={"/admin/ecommerce/brands/"} />
    </div>
  );
}
