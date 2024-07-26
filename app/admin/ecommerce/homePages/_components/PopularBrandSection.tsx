import SearchSelect from "@/app/components/global/SearchSelect";
import { Box, TextField } from "@mui/material";
import React from "react";

export default function PopularBrandSection({
  handlePopularBrands,
  index,
  item,
}) {
  return (
    <Box>
      <div className="grid grid-cols-3 gap-4">
        <TextField
          label="عنوان"
          value={item.content.title}
          onChange={(e) => handlePopularBrands(index, e.target.value)}
        />
      </div>
    </Box>
  );
}
