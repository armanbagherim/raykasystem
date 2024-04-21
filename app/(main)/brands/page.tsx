import React from "react";
import BrandModule from "./BrandModule";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `جهیزان | برند ها`,
  };
}

async function getBrands() {
  const res = await fetch(
    "https://nest-jahizan.chbk.run/v1/api/ecommerce/brands?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=true",
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
