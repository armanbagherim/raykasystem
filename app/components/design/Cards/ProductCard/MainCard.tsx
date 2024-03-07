import React from "react";
import VariantsCard from "./VariantsCard";
import CountDown from "../../CountDown";

export default function MainCard() {
  return (
    <div className="flex-auto">
      <div className="flex w-full flex-col gap-5 border bg-white rounded-3xl p-4">
        <img className="w-1/2 mx-auto" src="/images/product-1.png" />
        <div className="flex flex-col justify-between w-full">
          <h3 className="mb-2">محصول آزمایشی با حدود 2 خط متن یه کم طولانی</h3>
          <div className="flex mt-2 mb-6">
            <VariantsCard isSelected={false} color="#753e1a" name="قرمز" />
            <VariantsCard isSelected={false} color="#30739a" name="زرد" />
            <VariantsCard isSelected={false} color="#b6b6b6" name="سبز" />
            <VariantsCard isSelected={false} color="#ffeb9ce2" name="کرم" />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div>
              <CountDown />
            </div>
            <div className="text-left text-base">
              <span className="mb-1 block">
                <span className="text-xs mr-2  bg-primary text-white rounded-full px-2 py-1">
                  14%
                </span>
                <span className="opacity-75 text-xs line-through">
                  {Number(125000).toLocaleString()}
                </span>
              </span>
              <p className="text-sm">{Number(125000).toLocaleString()} تومان</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
