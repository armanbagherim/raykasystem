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
import ServerSelect from "@/app/components/global/ServerSelect";
import { useAtom } from "jotai";
import { pageTitle } from "@/app/admin/layout";

export default function NewDiscount() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "افزودن شرط تخفیف",
      buttonTitle: "",
      link: ``,
    });
  }, []);

  const [requestBody, setRequestBody] = useState({
    discountId: +params.id,
    conditionTypeId: 1,
    conditionValue: null,
  });

  const {
    data: discountConditions,
    isLoading: discountConditionsIsLoading,
    error: discountConditionsError,
  } = useFetcher(`/v1/api/ecommerce/admin/discountConditionTypes`, "GET");

  const {
    data: conditions,
    isLoading: conditionsIsLoading,
    error: conditionsError,
  } = useFetcher(
    `/v1/api/ecommerce/admin/discountConditionValues?sortOrder=ASC&conditionTypeId=${requestBody.conditionTypeId}&offset=0&limit=10&orderBy=id`,
    "GET"
  );

  const save = async () => {
    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/admin/discountConditions",
        method: "POST",
        body: requestBody,
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push(`/admin/ecommerce/discounts/conditions/${params.id}`);
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <SearchSelect
          loadingState={discountConditionsIsLoading}
          data={discountConditions?.result}
          label="نوع شرط اعمالی"
          defaultValue={1}
          onChange={(e) =>
            setRequestBody({ ...requestBody, conditionTypeId: e.id })
          }
        />
      </div>
      <div className="mb-6">
        <ServerSelect
          isServer={true}
          init={conditions}
          type={requestBody.conditionTypeId}
          loadingState={conditionsIsLoading}
          setRequestBody={setRequestBody}
          requestBody={requestBody}
          fetchUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/admin/discountConditionValues`}
        />
      </div>
      <SaveBar
        action={save}
        backUrl={`/admin/ecommerce/discounts/conditions/${params.id}`}
      />
    </div>
  );
}
