import SearchSelect from "@/app/components/global/SearchSelect";
import { Box, TextField } from "@mui/material";
import React from "react";

export default function ProductBrandSection({
  handleProductBrandChange,
  index,
  item,
  brands,
  TypeSorts,
}) {
  return (
    <Box>
      <div className="grid grid-cols-3 gap-4">
        <SearchSelect
          value={item.content.brandId}
          onChange={(e) =>
            handleProductBrandChange(
              index,
              e.id,
              item.content.title,
              item.content.sortBy
            )
          }
          data={brands.result}
          defaultValue={item.content.brandId}
          label="برند"
        />

        <TextField
          label="عنوان"
          value={item.content.title}
          onChange={(e) =>
            handleProductBrandChange(
              index,
              item.content.brandId,
              e.target.value,
              item.content.sortBy
            )
          }
        />

        <SearchSelect
          value={item.content.sortBy}
          onChange={(e) =>
            handleProductBrandChange(
              index,
              item.content.brandId,
              item.content.title,
              e.id
            )
          }
          data={TypeSorts.result}
          isDiff
          diffName="title"
          defaultValue={item.content.sortBy}
          label="نوع مرتب سازی"
        />
      </div>
    </Box>
  );
}
