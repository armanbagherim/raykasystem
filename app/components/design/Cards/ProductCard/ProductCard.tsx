import React from "react";
import VariantsCard from "./VariantsCard";
import CountDown from "../../CountDown";
import LongCard from "./LongCard";
import MainCard from "./MainCard";
interface ProductCardProps {
  type: String;
  // data: object;
}
export default function ProductCard({ type, border }: ProductCardProps) {
  if (type === "main") {
    return <MainCard />;
  } else if (type === "long") {
    return <LongCard border={border} />;
  }
}
