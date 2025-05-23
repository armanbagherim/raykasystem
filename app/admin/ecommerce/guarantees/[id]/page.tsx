"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "../../../../components/global/loading";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { pageTitle } from "../../../layout";
import { HexColorPicker } from "react-colorful";
import SaveBar from "@/app/components/global/SaveBar";
import SeoBox from "../../products/_components/SeoBox";
import ChangeToNull from "@/app/components/global/ChangeToNull";

export default function Guarantees() {
  const params = useParams();
  const [title, setTitle] = useAtom(pageTitle);

  const {
    data: guaranteesData,
    isLoading: guaranteesIsLoading,
    error: guaranteesError,
  } = useFetcher(`/v1/api/ecommerce/guarantees/${params.id}`, "GET");

  useEffect(() => {
    setTitle({
      title: "ویرایش گارانتی",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const [metaDescription, setMetaDescription] = useState();
  const [metaKeywords, setMetaKeywords] = useState();
  const [metaTitle, setMetaTitle] = useState();
  const [description, setDescription] = useState();
  const router = useRouter();

  useEffect(() => {
    if (guaranteesIsLoading === false) {
      setName(guaranteesData.result.name);
      setSlug(guaranteesData.result.slug);
      setDescription(
        guaranteesData.result.description
          ? guaranteesData.result.description
          : ""
      );
      setMetaDescription(guaranteesData.result.metaDescription);
      setMetaKeywords(guaranteesData.result.metaKeywords);
      setMetaTitle(guaranteesData.result.metaTitle);
    }
  }, [guaranteesIsLoading]);

  const save = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/guarantees/${params.id}`,
        method: "PUT",
        body: {
          name,
          slug,
          description: ChangeToNull(description),
          metaKeywords,
          metaDescription,
          metaTitle,
        },
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/guarantees");
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (guaranteesIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          نام گارانتی
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
          لینک گارانتی
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          value={slug}
          onChange={(e) => setSlug(ChangeToNull(e.target.value))}
        />

        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          توضیحات
        </label>
        <SeoBox
          setDescription={setDescription}
          description={description ?? ""}
        />
      </div>

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

      <SaveBar action={save} backUrl={"/admin/ecommerce/guarantees/"} />
    </div>
  );
}
