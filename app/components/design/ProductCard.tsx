import React from "react";

interface ProductCardProps {
  type: String;
  // data: object;
}
export default function ProductCard({ type }: ProductCardProps) {
  if (type === "big") {
    return "big";
  } else if (type === "small") {
    return (
      <div>
        <img alt="" />
        asd
      </div>
    );
  }
}
