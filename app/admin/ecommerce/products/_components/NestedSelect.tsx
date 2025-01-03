import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const NestedSelect = ({
  data,
  selected,
  onChange,
  depth = 0,
  disabled = false,
  parentEntityTypesIsLoading,
}) => {
  const renderOptions = (items, depth) => {
    return items?.flatMap((item) => {
      const prefix = "--".repeat(depth);
      const menuItem = (
        <MenuItem key={item.id} value={item.id}>
          {prefix + item.name}
        </MenuItem>
      );

      // If the item has subEntityTypes, render those options as well
      if (item.subEntityTypes) {
        return [menuItem, ...renderOptions(item.subEntityTypes, depth + 1)];
      }

      return menuItem; // Return just the menuItem if no subEntityTypes
    });
  };

  return (
    <FormControl fullWidth variant="outlined" disabled={disabled}>
      <InputLabel id="nested-select-label">دسته بندی</InputLabel>
      <Select
        disabled={parentEntityTypesIsLoading}
        labelId="nested-select-label"
        value={selected || ""}
        onChange={onChange}
        label="دسته بندی"
      >
        {renderOptions(data, depth)}
      </Select>
    </FormControl>
  );
};

export default NestedSelect;
