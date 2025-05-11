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
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products?limit=12&discountTypeId=2&${queryString}`;

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
    title: "تخفیفات شگفت انگیز | رایکا سیستم",
  };
}

const Sellerpage = async ({ params, searchParams }) => {
  const products = await getProducts(searchParams);

  const { result: range } = await getPriceRange();

  return (
    <>
      <div className=" bg-primary py-10 bg-[url('/images/pattern.png')]">
        <div className="container justify-center mx-auto mt-10 mb-20">
          <div className="text-3xl p-5 pr-4 md:pr-7">
            <h1 className="peyda text-[26px] text-white">تخفیفات شگفت انگیز</h1>
          </div>
          <div className="mt-7">
            <div className="grid grid-cols-12 h-full">
              <Sidebar range={range} showAmazing={false} />
              <div className="col-span-12 md:col-span-9 p-0 sm:px-4">
                <div>
                  <div className=" grid rounded-xl mx-2 grid-cols-1 bg-white p-4">
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
                    <div className="col-span-1 items-center flex justify-end ">
                      <div className="text-xs text-slate-500">
                        {products?.total} کالا
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-3 sm:gap-6 gap-2">
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
      </div>
    </>
  );
};

export default Sellerpage;
