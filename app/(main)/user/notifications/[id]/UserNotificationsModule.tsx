"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function UserNotificationsModule({ data }) {
  return (
    <div className="border-0 w-full rounded-xl mt-5">
      <h1 className="text-2xl peyda mb-4">اطلاع رسانی ها</h1>
      <div
        key={data.result.id}
        className="flex mb-4 border flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between border-gray-200 rounded-2xl px-4 py-2"
      >
        <div className="flex items-center gap-2">
          <h4 className="">{data.result.message}</h4>
        </div>
      </div>
    </div>
  );
}
