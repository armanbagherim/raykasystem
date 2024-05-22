import React from "react";
import VariantsCard from "./VariantsCard";
import CountDown from "../../CountDown";
import Price from "./Price";
import Image from "next/image";
import Link from "next/link";

export default function MainCard({ data }) {
  const uniqueColorsMap = new Map(
    data?.inventories.map((value) => [value?.color?.id, value])
  );

  // Convert the Map values back into an array
  const uniqueColorsArray = Array.from(uniqueColorsMap.values());
  return (
    <Link href={`/product/${data?.sku}/${data?.slug}`} className="flex h-full">
      <div className="flex w-full flex-col border bg-white rounded-3xl justify-start h-auto relative">
        {data?.attachments[0]?.fileName ? (
          <Image
            width={200}
            height={200}
            className="mx-auto h-auto object-contain rounded-3xl w-full"
            priority
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productphotos/image/${data?.attachments[0].fileName}`}
          />
        ) : (
          <Image
            width={200}
            height={200}
            className="w-full border border-gray-200 rounded-3xl mb-2"
            src="/images/no-photo.png"
            alt=""
          />
        )}

        <div className="flex flex-col justify-between w-full h-full">
          <div className="p-2 sm:p-4">
            <h3 className="mb-2 w-full h-auto whitespace-break-spaces mt-3 text-sm">
              {data?.title}
            </h3>
            <div className="flex mt-2 mb-6 flex-col absolute top-0 right-[10px] bg-white pt-[8px] pb-[14px] px-1 rounded-full">
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
            {/* <div className="h-8"></div> */}
          </div>

          <div className="p-2 sm:p-4 flex flex-col md:flex-row justify-end">
            {data.inventories[0]?.firstPrice?.appliedDiscount ? (
              <CountDown
                dates={
                  data.inventories[0]?.firstPrice?.appliedDiscount?.endDate
                }
              />
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
