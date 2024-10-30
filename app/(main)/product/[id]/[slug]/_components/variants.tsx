import React, { useState, useEffect } from "react";

export default function Variants({ product, handleVariantChange }) {
  // Create a Set from the color IDs to remove duplicates
  const uniqueColorIds = new Set(
    product?.inventories.map((value) => value?.color?.id)
  );

  // Convert the Set back to an array for mapping
  const uniqueColors = Array.from(uniqueColorIds).map((id) => {
    // Find the first inventory item that matches the color ID
    const inventoryItem = product.inventories.find(
      (value) => value?.color?.id === id
    );
    return inventoryItem;
  });

  // Initialize activeColorId with the ID of the first color if available
  const [activeColorId, setActiveColorId] = useState(
    uniqueColors.length > 0 ? uniqueColors[0].color?.id : null
  );

  return (
    <>
      {product.colorBased && product.inventoryStatusId === 1 ? (
        <h4 className="mt-7 mb-4 font-bold text-lg peyda">انتخاب رنگ</h4>
      ) : null}
      {product.colorBased && (
        <div className="flex gap-2 md:gap-4 flex-wrap mb-8">
          {product.colorBased
            ? uniqueColors.map((value, key) => (
                <div
                  key={key}
                  onClick={(e) => {
                    handleVariantChange(value?.color?.id);
                    setActiveColorId(value?.color?.id); // Update the active color
                  }}
                  className={`flex items-center my-auto cursor-pointer gap-2 ${
                    activeColorId === value?.color?.id
                      ? "border px-4 py-2 border-primary bg-primary/5 border-solid rounded-xl"
                      : "border rounded-xl px-4 border-dashed border-gray-400 py-2"
                  }`}
                >
                  <div
                    style={{ backgroundColor: `${value?.color?.hexCode}` }}
                    className={`w-4 h-4 md:w-4 md:h-4  rounded-full inline border border-gray-300`}
                  ></div>
                  <div className="text-sm font-medium">
                    {value?.color?.name}
                  </div>
                </div>
              ))
            : ""}
        </div>
      )}
    </>
  );
}
