import React from "react";

export default function Price({ data }) {
  return data ? (
    <div className="text-left text-base">
      {data?.firstPrice?.appliedDiscount ? (
        <>
          <span className="mb-1 block">
            <span className="text-xs mr-2  bg-primary text-white rounded-full px-2 py-1">
              {data?.firstPrice?.appliedDiscount?.amount}
              {data?.firstPrice?.appliedDiscount?.actionType === 1
                ? "%"
                : "تومانء"}
            </span>
            <span className="opacity-75 text-xs line-through">
              {Number(data?.firstPrice?.price).toLocaleString()}
            </span>
          </span>
          <p className="text-sm">
            {Number(
              data?.firstPrice?.appliedDiscount?.newPrice
            ).toLocaleString()}{" "}
            تومانء
          </p>
        </>
      ) : (
        <p className="text-sm">
          {Number(data?.firstPrice?.price).toLocaleString()} تومانء
        </p>
      )}
    </div>
  ) : (
    <div className="bg-gray-200 p-3 rounded-xl !w-full !text-center">
      ناموجود
    </div>
  );
}
