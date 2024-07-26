"use client";
import React from "react";

export default function Price({ data }) {
  return data?.inventoryStatusId === 1 ? (
    <div className="text-left text-base">
      {data?.inventories[0]?.firstPrice?.appliedDiscount ? (
        <>
          <span className="mb-1 flex flex-col-reverse gap-2 items-end">
            <span className="text-xs mr-2  bg-primary text-white rounded-full px-2 py-1">
              {data?.inventories[0]?.firstPrice?.appliedDiscount?.amount}
              {data?.inventories[0]?.firstPrice?.appliedDiscount?.actionType ===
              1
                ? "%"
                : "ءتء"}
            </span>
            <span className="opacity-75 text-xs line-through">
              {Number(data?.inventories[0]?.firstPrice.price).toLocaleString()}
            </span>
          </span>
          <p className="text-sm font-bold text-primary">
            {Number(
              data?.inventories[0]?.firstPrice?.appliedDiscount?.newPrice
            ).toLocaleString()}{" "}
            ءتء
          </p>
        </>
      ) : (
        <p className="text-sm font-bold text-primary">
          {Number(data?.inventories[0]?.firstPrice?.price).toLocaleString()} ءتء
        </p>
      )}
    </div>
  ) : (
    <div className="bg-gray-200 p-3 rounded-xl !w-full !text-center">
      ناموجود
    </div>
  );
}
