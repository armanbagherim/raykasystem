import SearchSelect from "@/app/components/global/SearchSelect";
import { Box, TextField } from "@mui/material";
import React from "react";

export default function AmazingSection({
  handleAmazingChange,
  index,
  item,
  TypeSorts,
}) {
  return (
    <Box>
      <div className="grid grid-cols-3 gap-4">
        <TextField
          label="عنوان"
          value={item.content.title}
          onChange={(e) =>
            handleAmazingChange(index, e.target.value, item.content.sortBy)
          }
        />

        <SearchSelect
          value={item.content.sortBy}
          onChange={(e) => handleAmazingChange(index, item.content.title, e.id)}
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
