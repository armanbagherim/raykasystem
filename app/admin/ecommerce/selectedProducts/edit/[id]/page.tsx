"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { HexColorPicker } from "react-colorful";
import { pageTitle } from "@/app/admin/layout";
import Loading from "@/app/components/global/loading";
import SaveBar from "@/app/components/global/SaveBar";
import SeoBox from "@/app/admin/ecommerce/products/_components/SeoBox";
import ChangeToNull from "@/app/components/global/ChangeToNull";
import { setPriority } from "os";

export default function Eav() {
  const params = useParams();
  const [titles, setTitles] = useAtom(pageTitle);

  useEffect(() => {
    setTitles({
      title: "ویرایش دستچین",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [title, setTitle] = useState();
  const [slug, setSlug] = useState();
  const [description, setDescription] = useState();
  const [metaDescription, setMetaDescription] = useState();
  const [metaKeywords, setMetaKeywords] = useState();
  const [metaTitle, setMetaTitle] = useState();
  const [parentEntityTypeId, setParentEntityTypeId] = useState();
  const [priority, setPriority] = useState();
  const router = useRouter();

  const {
    data: selectedProduct,
    isLoading: selectedProductsLoading,
    error: entityTypeError,
  } = useFetcher(
    `/v1/api/ecommerce/admin/selectedProducts/${params.id}`,
    "GET"
  );

  useEffect(() => {
    if (selectedProductsLoading === false) {
      setTitle(selectedProduct.result.title);
      setSlug(selectedProduct.result.slug);
      setDescription(
        selectedProduct.result.description
          ? selectedProduct.result.description
          : ""
      );
      setMetaDescription(selectedProduct.result.metaDescription);
      setMetaKeywords(selectedProduct.result.metaKeywords);
      setMetaTitle(selectedProduct.result.metaTitle);
      setParentEntityTypeId(selectedProduct.result.parentEntityTypeId);
      setPriority(selectedProduct.result.priority);
    }
  }, [selectedProductsLoading]);

  const save = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/selectedProducts/${params.id}`,
        method: "PUT",
        body: {
          title,
          slug,
          selectedProductTypeId: 1,
          metaKeywords,
          metaDescription,
          description: ChangeToNull(description),
          metaTitle,
          priority: priority === "null" ? null : +priority,
        },
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/selectedProducts");
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (selectedProductsLoading) {
    return <Loading />;
  }

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
          value={title}
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
          value={slug}
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
