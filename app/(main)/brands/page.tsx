import React from "react";
import BrandModule from "./BrandModule";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `برند ها | رایکا سیستم`,
    alternates: {
      canonical: `${process.env.WEBSITE_BASE_URL}/brands`,
    },
  };
}

async function getBrands() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/brands?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=true`,
    {
      cache: "no-store",
    }
  );
  const data = res.json();

  return data;
}

export default async function page() {
  const data = await getBrands();
  // const prices = await calculate();
  return <BrandModule data={data} />;
}
