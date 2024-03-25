import React from "react";
import VariantsCard from "./VariantsCard";
import CountDown from "../../CountDown";
import LongCard from "./LongCard";
import MainCard from "./MainCard";
import Link from "next/link";
interface ProductCardProps {
  type: String;
  border?: String;
  data: object;
}
export default function ProductCard({ type, border, data }: ProductCardProps) {
  console.log(data);
  if (type === "main") {
    return <MainCard data={data} />;
  } else if (type === "long") {
    return <LongCard data={data} border={border} />;
  }
}
