"use client";
import SaveBar from "@/app/components/global/SaveBar";
import SearchSelect from "@/app/components/global/SearchSelect";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import { Switch, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../../layout";

export default function NewDiscount() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useAtom(pageTitle);

  const [requestBody, setRequestBody] = useState({
    id: null,
    name: null,
    description: null,
    priority: null,
    isActive: true,
    startDate: "2024-03-26T01:49:58.489Z",
    endDate: "2024-03-26T01:49:58.489Z",
    minPrice: null,
    maxPrice: null,
  });

  const {
    data: discount,
    isLoading: discountIsLoading,
    error: discountError,
  } = useFetcher(`/v1/api/ecommerce/admin/factorDiscounts/${params.id}`, "GET");

  useEffect(() => {
    setTitle({
      title: "ویرایش تخفیف",
      buttonTitle: "",
      link: "",
    });
  }, []);

  useEffect(() => {
    if (!discountIsLoading) {
      setRequestBody((prevState) => ({
        ...prevState,
        id: discount.result.id,
        name: discount.result.name,
        description:
          discount.result.description === ""
            ? null
            : discount.result.description,

        priority: discount.result.priority,
        startDate: discount.result.startDate,
        endDate: discount.result.endDate,
        minPrice: +discount.result.minPrice,
        maxPrice: +discount.result.maxPrice,
      }));
    }
  }, [discountIsLoading]);

  const save = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/factorDiscounts/${params.id}`,
        method: "PUT",
        body: requestBody,
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/factorDiscounts");
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (discountIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          نام
        </label>
        <TextField
          type="text"
          id="first_name"
          variant="standard"
          fullWidth
          required
          value={requestBody.name}
          onChange={(e) =>
            setRequestBody((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          توضیحات
        </label>
        <TextField
          value={requestBody.description}
          type="text"
          id="first_name"
          variant="standard"
          fullWidth
          required
          onChange={(e) =>
            setRequestBody((prevState) => ({
              ...prevState,
              description: e.target.value === "" ? null : e.target.value,
            }))
          }
        />
      </div>

      <div className="flex gap-6 mb-6">
        <div className="flex-1">
          <label
            htmlFor="first_name"
            className="block mb-0 text-sm font-medium text-gray-900 "
          >
            تاریخ شروع
          </label>
          <DatePicker
            format="MM/DD/YYYY HH:mm:ss"
            plugins={[<TimePicker key={1} position="bottom" />]}
            calendar={persian}
            value={requestBody.startDate}
            onOpenPickNewDate={false}
            locale={persian_fa}
            inputClass="w-full border-b outline-none py-1 border-gray-500"
            containerClassName="w-full"
            onClose={() =>
              setRequestBody({
                ...requestBody,
                startDate: null,
              })
            }
            onFocusedDateChange={(dateFocused, dateClicked) => {
              setRequestBody({
                ...requestBody,
                startDate: dateClicked.toDate().toISOString(),
              });
            }}
          ></DatePicker>
        </div>
        <div className="flex-1">
          <label
            htmlFor="first_name"
            className="block mb-0 text-sm font-medium text-gray-900 "
          >
            تاریخ پایان
          </label>
          <DatePicker
            format="MM/DD/YYYY HH:mm:ss"
            inputClass="w-full border-b outline-none py-1 border-gray-500"
            containerClassName="w-full"
            onOpenPickNewDate={false}
            value={requestBody.endDate}
            plugins={[<TimePicker key={2} position="bottom" />]}
            calendar={persian}
            locale={persian_fa}
            onClose={() =>
              setRequestBody({
                ...requestBody,
                endDate: null,
              })
            }
            onFocusedDateChange={(dateFocused, dateClicked) => {
              setRequestBody({
                ...requestBody,
                endDate: dateClicked.toDate().toISOString(),
              });
            }}
          />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <TextField
          type="number"
          value={requestBody.minPrice}
          onChange={(e) =>
            setRequestBody({
              ...requestBody,
              minPrice: e.target.value === "" ? null : +e.target.value,
            })
          }
          label="حداقل خرید"
          variant="standard"
          fullWidth
        />
        <TextField
          type="number"
          value={requestBody.maxPrice}
          onChange={(e) =>
            setRequestBody({
              ...requestBody,
              maxPrice: e.target.value === "" ? null : +e.target.value,
            })
          }
          label="حداکثر خرید"
          variant="standard"
          fullWidth
        />
      </div>

      <div className="flex gap-6 items-center">
        <div className="flex-1 flex flex-col">
          <label className="inline-flex items-center cursor-pointer">
            <span className="ml-3 text-sm font-medium text-gray-900 ">
              فعال؟
            </span>
            <Switch
              checked={requestBody.isActive}
              onChange={(e) =>
                setRequestBody({
                  ...requestBody,
                  isActive: !requestBody.isActive,
                })
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </label>
        </div>
        <div className="mb-6 flex-1">
          <TextField
            type="number"
            onChange={(e) =>
              setRequestBody({ ...requestBody, priority: +e.target.value })
            }
            label="اولویت"
            value={requestBody.priority}
            variant="standard"
            fullWidth
          />
        </div>
      </div>
      <SaveBar action={save} backUrl={"/admin/ecommerce/discounts/"} />
    </div>
  );
}
