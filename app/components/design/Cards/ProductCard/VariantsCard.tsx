import React from "react";

export default function VariantsCard({ isSelected, name, color }) {
  return (
    <span className={`flex -mb-1 items-center rounded-lg`}>
      <span
        className={`w-3 h-3 rounded-full border border-gray-500 inline-block`}
        style={{ backgroundColor: color }}
      ></span>
    </span>
  );
}
