import React from "react";
import VariantsCard from "./VariantsCard";
import CountDown from "../../CountDown";
import Price from "./Price";
import Image from "next/image";
import Link from "next/link";
import { SpecDiscount } from "../../Icons";

export default function MainCard({ data }) {
  const uniqueColorsMap = new Map(
    data?.inventories.map((value) => [value?.color?.id, value])
  );

  // Convert the Map values back into an array
  const uniqueColorsArray = Array.from(uniqueColorsMap.values());
  return (
    <Link href={`/product/${data?.sku}/${data?.slug}`} className="flex h-full">
      <div className="flex w-full flex-col pt-4 bg-white rounded-3xl justify-start h-auto relative w-full">
        {data?.attachments[0]?.fileName ? (
          <Image
            width={150}
            height={150}
            alt={data?.title}
            className="mx-auto h-auto object-contain rounded-3xl "
            priority
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/products/${
              data?.attachments[0]?.fileName ?? null
            }`}
          />
        ) : (
          <Image
            width={150}
            height={150}
            className="w-full border border-gray-200 rounded-3xl mb-2"
            src="/images/no-photo.png"
            alt=""
          />
        )}

        <div className="flex flex-col justify-between w-full h-full">
          <div className="p-2 sm:p-4">
            <h3 className="mb-2 w-full h-auto font-bold text-[#424242] whitespace-break-spaces mt-3 text-sm">
              {data?.title}
            </h3>
            {data.colorBased ? (
              <div className="flex mt-2 mb-6 flex-col absolute top-0 right-[10px] bg-white pt-[4px] pb-[9px] px-1 rounded-full">
                {uniqueColorsArray.map((value, key) => (
                  <VariantsCard
                    key={key}
                    isSelected={false}
                    color={value?.color?.hexCode}
                    name={value?.color?.name}
                  />
                ))}
              </div>
            ) : (
              ""
            )}

            {/* <div className="h-8"></div> */}
          </div>

          <div className="p-2 !pt-0 sm:p-4 flex flex-col md:flex-row justify-end">
            {data?.inventories[0]?.firstPrice?.appliedDiscount ? (
              // <CountDown
              //   dates={
              //     data.inventories[0]?.firstPrice?.appliedDiscount?.endDate
              //   }
              // />
              <SpecDiscount />
            ) : (
              ""
            )}

            <Price data={data} />
          </div>
        </div>
      </div>
    </Link>
  );
}
