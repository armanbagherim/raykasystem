import { useSearchParams } from "next/navigation";
import React from "react";

async function getTransactionStatus(params) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products?sortOrder=DESC&offset=0&limit=10&orderBy=id&entityTypeId=${entity}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function page(params, searchParams) {
  const data = getTransactionStatus(searchParams.transaction);
  return <div></div>;
}
