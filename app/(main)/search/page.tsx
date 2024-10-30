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
import Sidebar from "../../components/Sidebar";
import ProductCard from "@/app/components/design/Cards/ProductCard/ProductCard";
import { Suspense } from "react";

async function getColors() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/colors?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=false`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getPriceRange() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products/priceRange`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getProducts(searchParams) {
  // Construct the query string from searchParams
  const queryString = Object.entries(searchParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  // Construct the full URL with the query string
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products?${queryString}&limit=12`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    // notFound();
  }

  return res.json();
}

export async function generateMetadata({ searchParams }): Promise<Metadata> {
  return {
    title: searchParams.search
      ? `جهیزان | نتایج جست و جو برای ${searchParams.search}`
      : "جهیزان | جست و جو",
  };
}

const Sellerpage = async ({ params, searchParams }) => {
  const products = await getProducts(searchParams);

  const { result: colors } = await getColors();
  const { result: range } = await getPriceRange();

  return (
    <>
      <div className="container justify-center mx-auto mt-10 mb-20">
        <div className="text-3xl pb-0 px-4 flex justify-between items-center mb-4">
          <h1 className="peyda text-[18px] font-bold">
            {searchParams?.search == "" ? "همه محصولات" : searchParams?.search}
          </h1>
          <div className="col-span-1 items-center flex justify-end">
            <div className="text-xs text-primary font-bold">
              {products?.total} کالا
            </div>
          </div>
        </div>
        <div className="mt-7">
          <div className="grid grid-cols-12 h-full">
            <Sidebar colors={colors} range={range} />
            <div className="col-span-12 md:col-span-9 p-0 sm:px-4">
              <div>
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-2 gap-2">
                    {products?.result?.map((value, key) => (
                      <ProductCard
                        key={key}
                        data={value}
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
        </div>
      </div>
    </>
  );
};

export default Sellerpage;
