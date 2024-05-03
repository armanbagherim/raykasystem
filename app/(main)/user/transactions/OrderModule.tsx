"use client";
import Link from "next/link";
import React from "react";

export default function OrderModule({ data }) {
  return (
    <>
      <h1 className="text-2xl peyda mb-4">تراکنش ها</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                شماره سفارش
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت سفارش
              </th>
              <th scope="col" className="px-6 py-3">
                نوع پرداخت
              </th>
              <th scope="col" className="px-6 py-3">
                درگاه پرداخت
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
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {value.id}
                </th>
                <td className="px-6 py-4">{value?.paymentStatus?.name}</td>
                <td className="px-6 py-4">{value?.paymentType?.name}</td>
                <td className="px-6 py-4">{value?.paymentGateway?.name}</td>
                <td className="px-6 py-4 text-left">
                  <Link
                    href={`/user/orders/${value.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
