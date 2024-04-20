import React from "react";
import { Metadata } from "next";
import SingleProductModule from "./_components/SingleProductModule";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
const getProduct = async (slug: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products/${slug}`
  );
  const response = await res.json();
  console.log("newwwwwwwwwwwwwwww", response);
  if (response.statusCode === 404) {
    return notFound();
  }
  return response;
};

async function getRelated(entity) {
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

export async function generateMetadata({ params }): Promise<Metadata> {
  const slug = params.slug;

  const product = await getProduct(slug);
  return {
    title: product.result.result.title,
  };
}

export default async function SingleProduct({ params, searchParams }) {
  const coo = cookies();
  console.log(params);
  const {
    result: { result: product },
  } = await getProduct(params.slug);

  const { result: related } = await getRelated(product.entityTypeId);

  return (
    <SingleProductModule
      cook={coo.get("SessionName")}
      product={product}
      related={related}
    />
  );
}
