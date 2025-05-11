import LongCard from "@/app/components/design/Cards/ProductCard/LongCard";
import MainCard from "@/app/components/design/Cards/ProductCard/MainCard";
import { notFound } from "next/navigation";

import {
  Addsquare,
  Minussquare,
  Searchicon,
  Sorticon,
} from "@/app/components/design/Icons";
import Numberpaginate from "@/app/components/design/Slider/Numberpaginate";
import Sidebar from "../../../components/Sidebar";
import ProductCard from "@/app/components/design/Cards/ProductCard/ProductCard";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

async function getEntity(params) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/vendors/slug/${params.slug}`,
    {
      cache: "no-store",
    }
  );
  if (res.status === 404) {
    return notFound();
  }
  return res.json();
}

async function getPriceRange(entity) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products/priceRange?vendorId=${entity?.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getProducts(searchParams, entity) {
  const queryString = Object.entries(searchParams)
    .flatMap(([key, value]) => [value].flat().map((v) => [key, v]))
    .map((it) => it.join("="))
    .join("&");

  // Construct the full URL with the query string
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products?${queryString}&vendorId=${entity}&limit=12`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    // notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { result: entity } = await getEntity(params);

  return {
    title: `محصولات فروشگاه ${entity?.name} | رایکا سیستم`,
  };
}

const Sellerpage = async ({ params, searchParams }) => {
  const { result: entity } = await getEntity(params);
  const products = await getProducts(searchParams, entity?.id);

  const { result: range } = await getPriceRange(entity);

  return (
    <>
      <div className="container justify-center mx-auto mt-10 mb-20">
        <div className="text-3xl p-5 pr-4 md:pr-7">
          {" "}
          <h1 className="peyda text-[26px]">محصولات فروشگاه {entity?.name}</h1>
        </div>
        <div className="mt-7">
          <div className="grid grid-cols-12 h-full">
            <Sidebar range={range} />
            <div className="col-span-12 md:col-span-9 p-0 sm:px-4">
              <div>
                <div className="p-2 grid grid-cols-1 ">
                  {/* <div className="flex gap-2 col-span-3 whitespace-nowrap overflow-y-scroll md:overflow-y-hidden">
                    <span className="items-center flex">
                      <Sorticon />
                    </span>
                    <span className="text-primary items-center flex">
                      مرتب سازی بر اساس
                    </span>
                    <div className="flex gap-4 text-xs items-center font-normal text-slate-500 mr-5">
                      <span>
                        <a href="#">گران ترین</a>
                      </span>
                      <span className="bg-primary p-2 rounded-2xl text-white">
                        <a href="#">ارزان ترین</a>
                      </span>
                      <span>
                        <a href="#">پرفروش</a>
                      </span>
                      <span>
                        <a href="#">محبوبیت</a>
                      </span>
                    </div>
                  </div> */}
                  <div className="col-span-1 items-center flex justify-end">
                    <div className="text-xs text-slate-500">
                      {products?.total} کالا
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-2 gap-2">
                    {products?.result?.map((value, key) => (
                      <ProductCard
                        key={key}
                        data={value ?? null}
                        type="main"
                        className="w-full sm:w-1/2 md:w-1/3"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full col-span-12 flex justify-center overflow-x-auto">
                <Numberpaginate items={products} />
              </div>
            </div>
          </div>
          {entity?.description && (
            <div
              className="contentLong"
              dangerouslySetInnerHTML={{ __html: entity?.description }}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sellerpage;
