"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "../../../../components/global/loading";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { pageTitle } from "../../../layout";
import SaveBar from "@/app/components/global/SaveBar";

export default function Colors({ params }) {
  const [title, setTitle] = useAtom(pageTitle);
  const { data: messageData, isLoading: messageIsLoading } = useFetcher(
    `/v1/api/ecommerce/admin/notifications/${params.id}`,
    "GET"
  );

  useEffect(() => {
    setTitle({
      title: "ویرایش پیام",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const [message, setMessage] = useState();

  useEffect(() => {
    if (messageIsLoading === false) {
      setMessage(messageData.result.message);
    }
  }, [messageIsLoading]);
  const router = useRouter();

  const save = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/notifications/${params.id}`,
        method: "PUT",
        body: {
          message: message,
        },
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/notifications");
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (messageIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          پیام
        </label>
        <textarea
          id="first_name"
          className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
      </div>

      <SaveBar action={save} backUrl={"/admin/ecommerce/notifications/"} />
    </div>
  );
}
