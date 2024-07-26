"use client";
import Link from "next/link";
import * as React from "react";

export default function UserCommentsModule({ data }) {
  console.log(data);
  return (
    <div className="border-0 w-full rounded-xl mt-5">
      {data.result?.map((value) => (
        <>
          <div key={value.id} className="border w-full rounded-xl m-2 p-6">
            <div className="flex gap-4 flex-wrap justify-between items-center">
              <div className="flex gap-2 flex-col">
                <div className="flex gap-2">
                  <div className="text-md items-center my-auto">
                    {value?.user?.firstname} {value?.user?.lastname}
                  </div>
                  <span className="items-center my-auto">|</span>
                  <div className="text-md items-center my-auto">
                    {new Date(value.updatedAt).toLocaleDateString("fa-ir")}
                  </div>
                </div>
                <div>
                  <Link
                    href={`/product/${value.product.sku}/${value.product.slug}`}
                  >
                    {value?.product?.title}
                  </Link>
                </div>
              </div>
              <div className="px-3 py-2 bg-blue-100 text-sm text-blue-700 rounded-xl">
                {value?.status?.name}
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div className="mt-6 mb-2 text-md text-slate-500 leading-6 border-b border-b-gray-200 pb-4">
                {value.description}
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3" dir="ltr">
                {value.commentFactors.map((factor) => (
                  <div key={factor.id}>
                    <p className="my-4 text-right ">{factor.factor.name}</p>
                    <div className="score w-full flex rounded">
                      {Array.from(Array(factor.score), (_, i) => {
                        let colorClass;
                        if (i < 2) {
                          colorClass = "bg-primary";
                        } else if (i === 2) {
                          colorClass = "bg-primary";
                        } else {
                          colorClass = "bg-primary";
                        }
                        return (
                          <div
                            key={i}
                            className={`${colorClass} rounded-full h-[10px] w-[20%] mr-2 inline-block`}
                          ></div>
                        );
                      })}
                      {Array.from(Array(5 - factor.score), (_, i) => (
                        <div
                          key={i}
                          className="bg-gray-100 rounded-full h-[10px] w-[20%] mr-2 inline-block"
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
