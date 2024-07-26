import SearchSelect from "@/app/components/global/SearchSelect";
import { Box, TextField } from "@mui/material";
import React from "react";

export default function PopularCategories({
  handlePopularCategories,
  index,
  item,
}) {
  return (
    <Box>
      <div className="grid grid-cols-3 gap-4">
        <TextField
          label="عنوان"
          value={item.content.title}
          onChange={(e) => handlePopularCategories(index, e.target.value)}
        />
      </div>
    </Box>
  );
}
