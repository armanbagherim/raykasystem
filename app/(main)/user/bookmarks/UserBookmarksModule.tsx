"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function UserBookmarksModule({ data }) {
  return (
    <div className="border-0 w-full rounded-xl mt-5">
      <h1 className="text-2xl peyda mb-4">محصولات نشان شده</h1>
      {data.result?.map((value) => (
        <div
          key={value.product.result.id}
          className="flex mb-4 border flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between border-gray-200 rounded-2xl px-4 py-2"
        >
          <div className="flex items-center gap-4">
            <Image
              alt=""
              width={80}
              height={80}
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/products/${
                value.product.result.attachments[0].fileName ?? null
              }`}
            />
            <h4>{value.product.result.title}</h4>
          </div>
          <Link
            className="flex w-full md:w-auto text-center border bg-primary justify-center text-white rounded-2xl py-2 px-4"
            href={`/product/${value.product.result.sku}/${value.product.result.slug}`}
          >
            مشاهده محصول
          </Link>
        </div>
      ))}
    </div>
  );
}
