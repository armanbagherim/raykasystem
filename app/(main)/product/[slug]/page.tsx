import React from "react";
import { Metadata } from "next";
import SingleProductModule from "./_components/SingleProductModule";
import { cookies } from "next/headers";
const getProduct = async (slug: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products/${slug}`
  );
  const response = await res.json();
  return response;
};

async function getRelated() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products?sortOrder=DESC&offset=0&limit=10&orderBy=id`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const slug = params.slug;

  const product = await getProduct(slug);
  return {
    title: product.result.result.title,
  };
}

export default async function SingleProduct({ params }) {
  const coo = cookies();

  const {
    result: { result: product },
  } = await getProduct(params.slug);

  const { result: related } = await getRelated();

  return (
    <SingleProductModule
      cook={coo.get("SessionName")}
      product={product}
      related={related}
    />
  );
}
