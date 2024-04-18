import React, { useState, useEffect } from "react";

export default function Variants({ product, handleVariantChange }) {
  // Create a Set from the color IDs to remove duplicates
  const uniqueColorIds = new Set(
    product?.inventories.map((value) => value.color.id)
  );

  // Convert the Set back to an array for mapping
  const uniqueColors = Array.from(uniqueColorIds).map((id) => {
    // Find the first inventory item that matches the color ID
    const inventoryItem = product.inventories.find(
      (value) => value.color.id === id
    );
    return inventoryItem;
  });

  // Initialize activeColorId with the ID of the first color if available
  const [activeColorId, setActiveColorId] = useState(
    uniqueColors.length > 0 ? uniqueColors[0].color.id : null
  );

  return (
    <>
      {product.colorBased && product.inventoryStatusId === 1 ? (
        <h4 className="mt-7 mb-7 font-bold text-lg">انتخاب رنگ</h4>
      ) : (
        ""
      )}

      <div className="flex gap-6">
        {uniqueColors.map((value, key) => (
          <div
            key={key}
            onClick={(e) => {
              handleVariantChange(value.color.id);
              setActiveColorId(value.color.id); // Update the active color
            }}
            className={`flex items-center my-auto cursor-pointer gap-2 ${
              activeColorId === value.color.id
                ? "border px-4 py-2 border-primary rounded-xl"
                : "border border-white px-4 py-2"
            }`}
          >
            <div
              style={{ backgroundColor: `${value.color.hexCode}` }}
              className={`w-8 h-8 rounded-full inline`}
            ></div>
            <div>{value.color.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
