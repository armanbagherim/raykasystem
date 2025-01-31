"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "../../../components/global/loading";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import { HexColorPicker } from "react-colorful";
import SaveBar from "@/app/components/global/SaveBar";

export default function Colors() {
  const params = useParams();
  const [title, setTitle] = useAtom(pageTitle);
  const { data: notifications, isLoading: notificationsLoading } = useFetcher(
    `/v1/api/ecommerce/admin/headerNotifications`,
    "GET"
  );

  useEffect(() => {
    setTitle({
      title: "اطلاع رسانی",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [notificationValue, setNotificationValue] = useState();
  const [textColorValue, setTextColorValue] = useState();
  const [backgroundColorValue, setBackgroundColorValue] = useState();
  useEffect(() => {
    if (notificationsLoading === false) {
      setNotificationValue(notifications.result.message);
      setTextColorValue(notifications.result.textColor);
      setBackgroundColorValue(notifications.result.backgroundColor);
    }
  }, [notificationsLoading]);
  const router = useRouter();

  const save = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/headerNotifications`,
        method: "PUT",
        body: {
          message: notificationValue === "" ? null : notificationValue,
          textColor: textColorValue,
          backgroundColor: backgroundColorValue,
        },
      });
      toast.success("موفق");
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (notificationsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          متن نوتیفیکیشن
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          onChange={(e) => setNotificationValue(e.target.value)}
          value={notificationValue}
        />
        <label>رنگ متن</label>
        <HexColorPicker
          className="mb-5"
          color={textColorValue}
          onChange={setTextColorValue}
        />
        <label>رنگ زمینه</label>
        <HexColorPicker
          className="mb-5"
          color={backgroundColorValue}
          onChange={setBackgroundColorValue}
        />
      </div>

      <SaveBar action={save} backUrl={"/admin/ecommerce/colors/"} />
    </div>
  );
}
