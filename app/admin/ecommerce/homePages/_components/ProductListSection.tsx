import SearchSelect from "@/app/components/global/SearchSelect";
import { Box, TextField } from "@mui/material";
import React from "react";

export default function ProductListSection({
  handleProductChange,
  index,
  item,
  EntityTypes,
  TypeSorts,
}) {
  return (
    <Box>
      <div className="grid grid-cols-3 gap-4">
        <SearchSelect
          value={item.content.entityTypeId}
          onChange={(e) =>
            handleProductChange(
              index,
              e.id,
              item.content.title,
              item.content.sortBy
            )
          }
          data={EntityTypes.result}
          defaultValue={item.content.entityTypeId}
          label="دسته بندی"
        />

        <TextField
          label="عنوان"
          value={item.content.title}
          onChange={(e) =>
            handleProductChange(
              index,
              item.content.entityTypeId,
              e.target.value,
              item.content.sortBy
            )
          }
        />

        <SearchSelect
          value={item.content.sortBy}
          onChange={(e) =>
            handleProductChange(
              index,
              item.content.entityTypeId,
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
