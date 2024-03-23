import React from "react";
import VariantsCard from "./VariantsCard";
import CountDown from "../../CountDown";

export default function MainCard({ data }) {
  return (
    <div className="flex-auto">
      <div className="flex w-full flex-col gap-5 border bg-white rounded-3xl p-4">
        <img className="w-1/2 mx-auto" src="/images/product-1.png" />
        <div className="flex flex-col justify-between w-full">
          <h3 className="mb-2">{data?.title}</h3>
          <div className="flex mt-2 mb-6">
            {data?.inventories.map((value) => (
              <VariantsCard
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
            <div className="text-left text-base">
              {/* <span className="mb-1 block">
                <span className="text-xs mr-2  bg-primary text-white rounded-full px-2 py-1">
                  14%
                </span>
                <span className="opacity-75 text-xs line-through">
                  {Number(value.firstPrice.price).toLocaleString()}
                </span>
              </span> */}
              <p className="text-sm">
                {Number(data?.inventories[0].firstPrice.price).toLocaleString()}{" "}
                تومان
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
