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
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { pageTitle } from "../../../layout";

export default function NewDiscount() {
  const router = useRouter();
  const {
    data: hasPermission,
    isLoading: hasPermissionIsLoading,
    error: hasPermissionError,
  } = useFetcher(
    `/v1/api/core/user/permissions/isAccess/ecommerce.admin.discounts.superedit`,
    "GET"
  );
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "افزودن تخفیف جدید",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [requestBody, setRequestBody] = useState({
    name: null,
    description: null,
    discountTypeId: null,
    discountActionTypeId: null,
    discountActionRuleId: null,
    discountValue: null,
    maxValue: null,
    couponCode: null,
    priority: null,
    limit: null,
    isActive: true,
    startDate: null,
    endDate: null,
    vendorId: null,
    freeShipment: false,
  });
  const {
    data: discountTypes,
    isLoading: discountTypesIsLoading,
    error: discountTypesError,
  } = useFetcher(`/v1/api/ecommerce/admin/discountTypes`, "GET");

  const {
    data: discountActionTypes,
    isLoading: discountActionTypesIsLoading,
    error: discountActionTypesError,
  } = useFetcher(`/v1/api/ecommerce/admin/discountActionTypes`, "GET");

  const {
    data: discountActionRules,
    isLoading: discountActionRulesIsLoading,
    error: discountActionRulesError,
  } = useFetcher(`/v1/api/ecommerce/admin/discountActionRules`, "GET");

  const {
    data: vendors,
    isLoading: vendorsIsLoading,
    error: vendorsError,
  } = useFetcher(
    `/v1/api/ecommerce/user/vendors?sortOrder=DESC&offset=0&orderBy=id`,
    "GET"
  );
  useEffect(() => {
    setRequestBody({ ...requestBody, couponCode: null });
  }, [requestBody.discountTypeId]);
  const save = async () => {
    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/admin/discounts",
        method: "POST",
        body: requestBody,
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/discounts");
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };

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
          onChange={(e) =>
            setRequestBody((prevState) => ({
              ...prevState,
              name: e.target.value === "" ? null : e.target.value,
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
      <div className="mb-10">
        <SearchSelect
          loadingState={discountTypesIsLoading}
          data={discountTypes?.result}
          label="نوع تخفیف"
          onChange={(e) =>
            setRequestBody({ ...requestBody, discountTypeId: e.id })
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
      <div className="mb-6">
        <SearchSelect
          loadingState={discountActionTypesIsLoading}
          data={discountActionTypes?.result}
          label="مدل تخفیف"
          onChange={(e) =>
            setRequestBody({ ...requestBody, discountActionTypeId: e.id })
          }
        />
      </div>
      {requestBody.discountTypeId === 3 ? (
        <div className="mb-6">
          <TextField
            onChange={(e) => {
              // Check if the input value is empty
              const couponCode =
                e.target.value.trim() === "" ? null : e.target.value;
              // Update the requestBody with the new couponCode value
              setRequestBody({ ...requestBody, couponCode });
            }}
            label="کد تخفیف"
            variant="standard"
            fullWidth
          />
        </div>
      ) : (
        ""
      )}

      <div className="flex gap-4">
        <div className="mb-6 flex-1">
          <TextField
            onChange={(e) =>
              setRequestBody({
                ...requestBody,
                discountValue: e.target.value === "" ? null : +e.target.value,
              })
            }
            label="میزان تخفیف"
            variant="standard"
            fullWidth
          />
        </div>
        <div className="mb-6 flex-1">
          <TextField
            onChange={(e) =>
              setRequestBody({
                ...requestBody,
                maxValue: e.target.value === "" ? null : +e.target.value,
              })
            }
            label="سقف تخفیف"
            variant="standard"
            fullWidth
          />
        </div>
        <div className="mb-6 flex-1">
          <TextField
            type="number"
            onChange={(e) =>
              setRequestBody({
                ...requestBody,
                limit: e.target.value === "" ? null : +e.target.value,
              })
            }
            label="محدودیت استفاده"
            variant="standard"
            fullWidth
          />
        </div>
      </div>
      <div className="mb-6">
        <SearchSelect
          loadingState={discountActionRulesIsLoading}
          data={discountActionRules?.result}
          label="شرط اعمالی"
          onChange={(e) =>
            setRequestBody({ ...requestBody, discountActionRuleId: e.id })
          }
        />
      </div>
      <div className="mb-6">
        <SearchSelect
          loadingState={vendorsIsLoading}
          data={vendors?.result}
          // isDiff={true}
          // diffName={"name"}
          label="فروشگاه"
          onChange={(e) => setRequestBody({ ...requestBody, vendorId: e.id })}
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
          <label className="inline-flex items-center cursor-pointer">
            <span className="ml-3 text-sm font-medium text-gray-900 ">
              ارسال رایگان
            </span>
            <Switch
              disabled={!hasPermission?.result}
              checked={requestBody.freeShipment}
              onChange={(e) =>
                setRequestBody({
                  ...requestBody,
                  freeShipment: !requestBody.freeShipment,
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
              setRequestBody({
                ...requestBody,
                priority: e.target.value === "" ? null : +e.target.value,
              })
            }
            label="اولویت"
            variant="standard"
            fullWidth
          />
        </div>
      </div>
      <SaveBar action={save} backUrl={"/admin/ecommerce/discounts/"} />
    </div>
  );
}
