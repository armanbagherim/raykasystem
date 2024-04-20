import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BrandModule({ data }) {
  console.log(data);
  return (
    <div className="container mx-auto">
      <h1 className="peyda text-[26px] my-9">برند ها</h1>
      <div className="flex gap-4 flex-wrap px-6 md:px-0">
        {data.result.map((value, key) => {
          return (
            <Link key={key} href={`/brand/${value.slug}`}>
              <div className="flex flex-wrap flex-col items-center mb-4">
                <Image
                  width={500}
                  height={500}
                  className="w-24 border border-gray-200 rounded-2xl mb-2"
                  src={`https://nest-jahizan.chbk.run/v1/api/ecommerce/brands/image/${value.attachment.fileName}`}
                  alt=""
                />
                <h3>{value.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
