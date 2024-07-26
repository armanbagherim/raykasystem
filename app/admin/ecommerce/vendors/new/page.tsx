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
export default function Vendors() {
  const [title, setTitle] = useAtom(pageTitle);
  const [formBody, setFormBody] = useState({
    name: null,
    slug: null,
    address: null,
    description: null,
    priorityOrder: 1,
    user: {
      firstname: null,
      lastname: null,
      phoneNumber: null,
    },
    metaKeywords: null,
    metaDescription: null,
    metaTitle: null,
    commissions: [
      {
        variationPriceId: 1,
        amount: 0,
      },
    ],
  });
  const router = useRouter();

  const { data: variationPrices, isLoading: variationPricesIsLoading } =
    useFetcher(
      `/v1/api/ecommerce/admin/variationPrices?sortOrder=DESC&offset=0&limit=10&orderBy=id`,
      "GET"
    );

  useEffect(() => {
    if (!variationPricesIsLoading) {
      if (variationPrices?.result) {
        const initialCommissions = variationPrices.result.map((price) => ({
          variationPriceId: price.id,
          amount: 0,
        }));
        setFormBody((prevState) => ({
          ...prevState,
          commissions: initialCommissions,
        }));
      }
    }
  }, [variationPricesIsLoading]);

  useEffect(() => {
    setTitle({
      title: "افزودن  فروشگاه  جدید",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const save = async () => {
    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/vendors",
        method: "POST",
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
          onChange={(e) =>
            setFormBody({ ...formBody, name: ChangeToNull(e.target.value) })
          }
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
          onChange={(e) =>
            setFormBody({ ...formBody, slug: ChangeToNull(e.target.value) })
          }
        />
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          آدرس فروشنده
        </label>
        <input
          type="text"
          id="description"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          onChange={(e) =>
            setFormBody({ ...formBody, address: ChangeToNull(e.target.value) })
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
          onChange={(e) =>
            setFormBody({
              ...formBody,
              description: ChangeToNull(e.target.value),
            })
          }
        />
        <div className="flex gap-6">
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
              onChange={(e) =>
                setFormBody({
                  ...formBody,
                  user: {
                    ...formBody.user,
                    firstname: ChangeToNull(e.target.value),
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
              نام خانوادگی کاربر
            </label>
            <input
              type="text"
              id="description"
              className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={(e) =>
                setFormBody({
                  ...formBody,
                  user: {
                    ...formBody.user,
                    lastname: ChangeToNull(e.target.value), // Update the specific property within the nested object
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
          onChange={(e) =>
            setFormBody({
              ...formBody,
              user: {
                ...formBody.user,
                phoneNumber: ChangeToNull(e.target.value), // Update the specific property within the nested object
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
          setFormBody({ ...formBody, metaTitle: ChangeToNull(e.target.value) })
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
          setFormBody({
            ...formBody,
            metaDescription: ChangeToNull(e.target.value),
          })
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
          setFormBody({
            ...formBody,
            metaKeywords: ChangeToNull(e.target.value),
          })
        }
      />
      <div className="w-full bg-slate-200 rounded-xl p-4 mb-4">
        میزان کمیسیون
      </div>
      <div className="flex">
        <div className="flex-1 w-full">
          {!variationPricesIsLoading &&
            formBody.commissions.map((commission, index) => (
              <div key={index}>
                <label
                  htmlFor={`commission-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  {variationPrices?.result[index]?.name}
                </label>
                <input
                  type="text"
                  id={`commission-${index}`}
                  className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={commission.amount}
                  onChange={(e) => {
                    const newCommissions = [...formBody.commissions];
                    newCommissions[index].amount = ChangeToNull(e.target.value);
                    setFormBody({ ...formBody, commissions: newCommissions });
                  }}
                />
              </div>
            ))}
        </div>
      </div>
      <SaveBar action={save} backUrl={"/admin/ecommerce/vendors/"} />
    </div>
  );
}
