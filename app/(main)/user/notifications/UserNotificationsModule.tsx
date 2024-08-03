"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function UserNotificationsModule({ data }) {
  return (
    <div className="border-0 w-full rounded-xl mt-5">
      <h1 className="text-2xl peyda mb-4">اطلاع رسانی ها</h1>
      {data?.result?.map((value) => (
        <div
          key={value.id}
          className="flex mb-4 border flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between border-gray-200 rounded-2xl px-4 py-2"
        >
          <div className="flex items-center gap-2">
            <h4 className="line-clamp-1">{value.message}</h4>
          </div>
          <Link
            className="flex w-full md:w-auto text-center border bg-primary justify-center text-white rounded-2xl py-2 px-4"
            href={`/user/notifications/${value.id}`}
          >
            مشاهده
          </Link>
        </div>
      ))}
    </div>
  );
}
