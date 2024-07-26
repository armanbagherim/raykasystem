import { notFound } from "next/navigation";
import React from "react";

async function getPage(params) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/pages/slug/${params.slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getPage(params);
  return {
    title: `${product.result.metaTitle ?? product.result.title} | جهیزان`,
    description: product?.result?.metaDescription,
    keywords: product?.result?.metaKeywords,
  };
}

export default async function PageCreator({ params }) {
  const { result: page } = await getPage(params);
  return (
    <div className="container mx-auto">
      <div className="border border-[#f1f1f1] rounded-2xl md:p-8">
        <div className="text-3xl mb-6">
          <h1 className="peyda text-[26px]">{page.title}</h1>
        </div>
        <div
          className="leading-6 content"
          dangerouslySetInnerHTML={{ __html: page?.description }}
        ></div>
      </div>
    </div>
  );
}
