import React from "react";

export default function VariantsCard({ isSelected, name, color }) {
  return (
    <span
      className={`flex ml-1 items-center rounded-lg py-1 px-2 ${
        isSelected ? "border border-primary" : "border border-[#F1F1F1]"
      }`}
    >
      <span
        className={`w-4 h-4 rounded-md inline-block ml-1`}
        style={{ backgroundColor: color }}
      ></span>
      <span className="text-[10px]">{name}</span>
    </span>
  );
}
