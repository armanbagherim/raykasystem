"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "../../../../components/global/loading";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { pageTitle } from "../../../layout";

export default function page({ params }) {
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
      };
      setFormBody(updatedFormBody);
    }
  }, [vendors, vendorsIsLoading]);

  useEffect(() => {
    setTitle({
      title: "افزودن  فروشگاه  جدید",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const saveVendor = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/vendors/${params.id}`,
        method: "PUT",
        body: formBody,
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/vendors");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          نام
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
          value={formBody.name}
          onChange={(e) => setFormBody({ ...formBody, name: e.target.value })}
        />
        <label
          htmlFor="slug"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          لینک
        </label>
        <input
          type="text"
          id="slug"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
          value={formBody.slug}
          onChange={(e) => setFormBody({ ...formBody, slug: e.target.value })}
        />
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          آدرس
        </label>
        <input
          type="text"
          id="description"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
          value={formBody.address}
          onChange={(e) =>
            setFormBody({ ...formBody, address: e.target.value })
          }
        />
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          توضیحات
        </label>
        <input
          type="text"
          id="description"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
          value={formBody.description}
          onChange={(e) =>
            setFormBody({ ...formBody, description: e.target.value })
          }
        />
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          نام کاربر
        </label>
        <input
          type="text"
          id="description"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
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
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          نام کاربر
        </label>
        <input
          type="text"
          id="description"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
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
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          شماره موبایل
        </label>
        <input
          type="text"
          id="description"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
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

      <button
        onClick={saveVendor}
        className="bg-blue-700 text-white px-6 hover:bg-transparent hover:border hover:border-blue-700 hover:text-blue-700 transition-all py-3 border border-transparent rounded-xl"
      >
        ساخت فروشگاه جدید
      </button>
    </div>
  );
}
