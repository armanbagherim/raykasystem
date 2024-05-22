import React from "react";

export default function VariantsCard({ isSelected, name, color }) {
  return (
    <span className={`flex -mb-2 items-center rounded-lg`}>
      <span
        className={`w-5 h-5 rounded-full border border-gray-500 inline-block`}
        style={{ backgroundColor: color }}
      ></span>
    </span>
  );
}
