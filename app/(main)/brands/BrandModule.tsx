"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function BrandModule({ data }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = data.result.filter((brand) => {
    return brand.name.toLowerCase().includes(searchTerm?.toLowerCase());
  });
  console.log(data);
  return (
    <div className="container mx-auto">
      <div className="!px-4 md:px-0">
        <h1 className="peyda text-[26px] my-9">برند ها</h1>
        <div className="flex flex-wrap mb-4">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجوی برند"
            className="w-full rounded-xl mb-4 outline-none pl-4 text-sm text-gray-700 border border-gray-200 p-4"
          />
        </div>
      </div>

      <div className="flex gap-4 flex-wrap items-stretch justify-center px-6 md:px-0">
        {filteredBrands.map((value, key) => {
          return (
            <Link key={key} href={`/brand/${value.slug}`}>
              <div className="flex flex-wrap flex-col items-center mb-4">
                {value.attachment && value.attachment.fileName ? (
                  <Image
                    width={500}
                    height={500}
                    className="w-14 md:w-24 grayscale hover:grayscale-0 transition-all border border-gray-200 rounded-2xl mb-2"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brands/${value.attachment.fileName}`}
                    alt={value.name}
                  />
                ) : (
                  <Image
                    width={500}
                    height={500}
                    className="w-14 md:w-24 border border-gray-200 rounded-2xl mb-2"
                    src="/images/no-photo.png"
                    alt="بدون عکس"
                  />
                )}

                <h3>{value.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
