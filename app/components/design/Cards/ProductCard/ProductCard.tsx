import React from "react";
import VariantsCard from "./VariantsCard";
import CountDown from "../../CountDown";
interface ProductCardProps {
  type: String;
  // data: object;
}
export default function ProductCard({ type }: ProductCardProps) {
  if (type === "big") {
    return "big";
  } else if (type === "small") {
    return (
      <div className="flex-auto">
        <div className="flex w-full gap-5 border border-primary rounded-2xl p-4">
          <img src="/images/product-1.png" />
          <div className="flex flex-col justify-between w-full">
            <h3 className="">محصول آزمایشی با حدود 2 خط متن یه کم طولانی</h3>
            <div className="flex">
              <VariantsCard isSelected={false} color="#753e1a" name="قهوه ای" />
              <VariantsCard
                isSelected={false}
                color="#30739a"
                name="فیروزه ای"
              />
              <VariantsCard isSelected={false} color="#b6b6b6" name="نقره ای" />
              <VariantsCard isSelected={false} color="#ffeb9ce2" name="کرم" />
            </div>
            <div className="flex flex-row justify-between items-center">
              <div>
                <CountDown />
              </div>
              <div className="text-left text-base">
                <span className="mb-1 block">
                  <span className="text-base mr-2  bg-primary text-white rounded-full px-3 py-1">
                    14%
                  </span>
                  <span className="opacity-75 line-through">
                    {Number(125000).toLocaleString()}
                  </span>
                </span>
                <p className="text-xl">
                  {Number(125000).toLocaleString()} تومان
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
