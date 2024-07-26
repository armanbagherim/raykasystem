"use client";
import { EmptyOrders } from "@/app/components/design/Icons";
import Link from "next/link";
import React from "react";

export default function UserOrderModule({ data, title = "سفارشات" }) {
  if (data.result.length === 0) {
    return (
      <div className="text-center">
        <EmptyOrders />
        <h3 className="text-3xl peyda">سفارشی پیدا نشد</h3>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-2xl peyda mb-8">{title}</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                شماره سفارش
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت سفارش
              </th>
              <th scope="col" className="px-6 py-3">
                مبلغ کل سفارش
              </th>
              <th scope="col" className="px-6 py-3">
                تاریخ ثبت سفارش
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                <span className="">عملیات</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.result.map((value) => (
              <tr
                key={value.id}
                className="bg-white border-b   hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {value.id}
                </th>
                <td className="px-6 py-4">{value?.orderStatus?.name}</td>
                <td className="px-6 py-4">
                  {Number(value?.totalPrice).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {new Date(value?.createdAt).toLocaleDateString("fa-IR", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-left">
                  <Link
                    href={`/user/orders/${value.id}`}
                    className="font-medium text-blue-600  hover:underline"
                  >
                    جزئیات سفارش
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
