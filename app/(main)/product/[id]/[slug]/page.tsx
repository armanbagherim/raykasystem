import React from "react";
import { Metadata } from "next";
import SingleProductModule from "./_components/SingleProductModule";
import { cookies } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

enum InventoryStatusEnum {
  available = 1,
  unavailable = 2,
}

const getProduct = async (slug: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products/${slug}`
  );
  const response = await res.json();

  if (response.statusCode === 302) {
    permanentRedirect(encodeURI(response?.message));
  }

  if (response.statusCode === 404) {
    return notFound();
  }
  return response;
};

async function getRelated(entity) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products?sortOrder=DESC&offset=0&limit=10&orderBy=id&entityTypeId=${entity}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function favoriteStatus(productId, session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/productFavorites/status/${productId}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
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
    title: product?.result?.result?.metaTitle ?? product?.result?.result?.title,
    description: product?.result?.result?.metaDescription,
    keywords: product?.result?.result?.metaKeywords,
    twitter: {
      images:
        product?.result?.result?.attachments.length > 1
          ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/products/${product?.result?.result?.attachments[0]?.fileName}`
          : null,
    },
    openGraph: {
      images:
        product?.result?.result?.attachments.length > 1
          ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/products/${product?.result?.result?.attachments[0]?.fileName}`
          : null,
    },
    alternates: {
      canonical: `${process.env.WEBSITE_BASE_URL}/product/${product.result?.result?.sku}/${product.result?.result?.slug}`,
    },
    other: {
      product_id: product?.result?.result?.id,
      product_name:
        product?.result?.result?.metaTitle ?? product?.result?.result?.title,
      product_price:
        product?.result?.result?.inventoryStatusId ==
        InventoryStatusEnum.available
          ? product?.result?.result?.inventories[0]?.firstPrice.appliedDiscount
              ?.newPrice ||
            product?.result?.result?.inventories[0]?.firstPrice.price
          : "0",
      product_old_price:
        product?.result?.result?.inventoryStatusId ==
        InventoryStatusEnum.available
          ? product?.result?.result?.inventories[0]?.firstPrice?.price
          : "0",
      availability:
        product?.result?.result?.inventoryStatusId ==
        InventoryStatusEnum.available
          ? "instock"
          : "outofstock",
      guarantee: product?.result?.result?.inventories[0]?.guarantee?.name,
    },
  };
}
const getComments = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productComments/product/${id}?limit=4&sortOrder=DESC`
  );
  const response = await res.json();
  return response;
};

export default async function SingleProduct({ params, searchParams }) {
  const coo = cookies();
  const session = await getServerSession(authOptions);
  const {
    result: { result: product },
  } = await getProduct(params.slug);
  const { result: related } = await getRelated(product.entityTypeId);
  const comments = await getComments(product?.id);
  let favStatus;
  if (session) {
    favStatus = await favoriteStatus(product?.id, session);
  }

  return (
    <SingleProductModule
      cook={coo?.get("SessionName")}
      product={product}
      related={related}
      session={session}
      comments={comments}
      favStatus={favStatus}
    />
  );
}
