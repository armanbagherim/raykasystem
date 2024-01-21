import React from "react";

interface ProductCardProps {
  type: String;
  data: object;
}
export default function ProductCard({ type, data }: ProductCardProps) {
  if (type === "big") {
    return "big";
  } else if (type === "small") {
    return (
      <div>
        {data.name}
        <img src={data.thumb} alt="" />
      </div>
    );
  }
}
