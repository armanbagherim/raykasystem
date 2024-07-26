import React from "react";
import VariantsCard from "./VariantsCard";
import CountDown from "../../CountDown";
import Price from "./Price";
import Image from "next/image";
import Link from "next/link";

export default function LongCard({ border, data }) {
  const uniqueColorsMap = new Map(
    data?.inventories.map((value) => [value?.color?.id, value])
  );
  const uniqueColorsArray = Array.from(uniqueColorsMap.values());
  return (
    <Link
      href={`/product/${data?.sku}/${data?.slug}`}
      className="flex-auto h-auto"
    >
      <div
        className={`flex w-full h-full flex-col md:flex-col lg:flex-col xl:flex-row items-center 2xl:flex-row border border-${border} rounded-3xl p-4`}
      >
        {data?.attachments[0]?.fileName ? (
          <Image
            width="500"
            height="500"
            className="mx-auto w-full xl:w-32 h-full object-contain"
            priority
            alt=""
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productphotos/image/${data?.attachments[0].fileName}`}
          />
        ) : (
          <Image
            width={500}
            height={500}
            className="w-full xl:w-32 border border-gray-200 rounded-2xl mb-2"
            src="/images/no-photo.png"
            alt=""
          />
        )}
        <div className="flex flex-col justify-between w-full pr-4">
          <h3 className="mb-2 h-14 pl-4 whitespace-break-spaces">
            {data?.title}
          </h3>
          <div className="flex mt-2 mb-6">
            {data.colorBased
              ? uniqueColorsArray.map((value, key) => (
                  <VariantsCard
                    key={key}
                    isSelected={false}
                    color={value?.color?.hexCode}
                    name={value?.color?.name}
                  />
                ))
              : ""}
          </div>
          <div className="flex flex-row justify-between items-center">
            <div>
              {data.inventories[0]?.firstPrice?.appliedDiscount ? (
                <CountDown
                  dates={
                    data?.inventories[0]?.firstPrice?.appliedDiscount?.endDate
                  }
                />
              ) : (
                ""
              )}
            </div>
            <Price data={data} />
          </div>
        </div>
      </div>
    </Link>
  );
}
