import React from "react";
import VariantsCard from "./VariantsCard";
import CountDown from "../../CountDown";
import Price from "./Price";
import Image from "next/image";

export default function MainCard({ data }) {
  const uniqueColorsMap = new Map(
    data?.inventories.map((value) => [value.color.id, value])
  );

  // Convert the Map values back into an array
  const uniqueColorsArray = Array.from(uniqueColorsMap.values());
  return (
    <a href={`/product/${data?.slug}`} className="flex-auto">
      <div className="flex w-full flex-col gap-5 border bg-white rounded-3xl p-4">
        <Image
          width={200}
          height={400}
          className="h-full mx-auto"
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productphotos/image/${data?.attachments[0].fileName}`}
        />
        <div className="flex flex-col justify-between w-full">
          <h3 className="mb-2">{data?.title}</h3>
          <div className="flex mt-2 mb-6">
            {uniqueColorsArray.map((value, key) => (
              <VariantsCard
                key={key}
                isSelected={false}
                color={value.color.hexCode}
                name={value.color.name}
              />
            ))}
          </div>
          <div className="flex flex-row justify-between items-center">
            <div>
              <CountDown />
            </div>

            <Price data={data} />
          </div>
        </div>
      </div>
    </a>
  );
}
