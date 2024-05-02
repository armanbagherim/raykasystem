"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "../../../../components/global/loading";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { pageTitle } from "../../../layout";
import SaveBar from "@/app/components/global/SaveBar";

export default function Vendors({ params }) {
  const [title, setTitle] = useAtom(pageTitle);

  const [formBody, setFormBody] = useState({
    name: "",
    slug: "",
    address: "",
    description: "",
    priorityOrder: 1,
    user: {
      firstname: "",
      lastname: "",
      phoneNumber: "",
    },
    metaKeywords: "",
    metaDescription: "",
    metaTitle: "",
  });
  const router = useRouter();

  const { data: vendors, isLoading: vendorsIsLoading } = useFetcher(
    `/v1/api/ecommerce/vendors/${params.id}`,
    "GET"
  );

  useEffect(() => {
    if (!vendorsIsLoading && vendors?.result) {
      const { vendorUser } = vendors.result;
      const updatedFormBody = {
        ...formBody,
        name: vendors.result.name,
        slug: vendors.result.slug,
        address: vendors.result.address,
        description: vendors.result.description,
        priorityOrder: vendors.result.priorityOrder,
        user: {
          ...formBody.user,
          firstname: vendorUser.user.firstname,
          lastname: vendorUser.user.lastname,
          phoneNumber: vendorUser.user.phoneNumber,
        },
        metaKeywords: vendors.result.metaKeywords,
        metaDescription: vendors.result.metaDescription,
        metaTitle: vendors.result.metaTitle,
      };
      setFormBody(updatedFormBody);
    }
  }, [vendors, vendorsIsLoading]);

  useEffect(() => {
    setTitle({
      title: "ویرایش فروشگاه",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const save = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/vendors/${params.id}`,
        method: "PUT",
        body: formBody,
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/vendors");
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          نام
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          value={formBody.name}
          onChange={(e) => setFormBody({ ...formBody, name: e.target.value })}
        />
        <label
          htmlFor="slug"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          لینک
        </label>
        <input
          type="text"
          id="slug"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          value={formBody.slug}
          onChange={(e) => setFormBody({ ...formBody, slug: e.target.value })}
        />
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          آدرس
        </label>
        <input
          type="text"
          id="description"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          value={formBody.address}
          onChange={(e) =>
            setFormBody({ ...formBody, address: e.target.value })
          }
        />
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          توضیحات
        </label>
        <input
          type="text"
          id="description"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          value={formBody.description}
          onChange={(e) =>
            setFormBody({ ...formBody, description: e.target.value })
          }
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              نام کاربر
            </label>
            <input
              type="text"
              id="description"
              className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              value={formBody.user.firstname}
              onChange={(e) =>
                setFormBody({
                  ...formBody,
                  user: {
                    ...formBody.user,
                    firstname: e.target.value, // Update the specific property within the nested object
                  },
                })
              }
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              نام کاربر
            </label>
            <input
              type="text"
              id="description"
              className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={formBody.user.lastname}
              required
              onChange={(e) =>
                setFormBody({
                  ...formBody,
                  user: {
                    ...formBody.user,
                    lastname: e.target.value, // Update the specific property within the nested object
                  },
                })
              }
            />
          </div>
        </div>
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          شماره موبایل
        </label>
        <input
          type="text"
          id="description"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          value={formBody.user.phoneNumber}
          onChange={(e) =>
            setFormBody({
              ...formBody,
              user: {
                ...formBody.user,
                phoneNumber: e.target.value, // Update the specific property within the nested object
              },
            })
          }
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
        value={formBody.metaTitle}
        onChange={(e) =>
          setFormBody({ ...formBody, metaTitle: e.target.value })
        }
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
        value={formBody.metaDescription}
        onChange={(e) =>
          setFormBody({ ...formBody, metaDescription: e.target.value })
        }
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
        value={formBody.metaKeywords}
        onChange={(e) =>
          setFormBody({ ...formBody, metaKeywords: e.target.value })
        }
      />
      <SaveBar action={save} backUrl={"/admin/ecommerce/vendors/"} />
    </div>
  );
}
