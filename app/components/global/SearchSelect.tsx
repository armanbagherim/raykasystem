import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// Assuming data is an array of objects with id and name properties
// Helper function to safely access nested properties
const getNestedProperty = (obj, path, defaultValue = undefined) => {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length; i++) {
    if (current[parts[i]] === undefined) {
      return defaultValue;
    }
    current = current[parts[i]];
  }
  return current;
};

const formatOptions = (data, isDiff, diffName, nullable) => {
  if (nullable) {
    // اضافه کردن آبجکت با آی دی null و اسم بدون انتخاب به ابتدای آرایه
    data = [{ id: null, name: "بدون انتخاب" }, ...data]; // RESULT : [34,23, 45, 12, 67]
  }
  return data?.map((item) => ({
    id: item.id,
    name: isDiff ? getNestedProperty(item, diffName) : item.name,
  }));
};

export default function SearchSelect({
  loadingState,
  data,
  isDiff,
  onChange,
  label,
  value,
  diffName,
  nullable,
}) {
  if (loadingState) {
    return (
      <div className="flex-1">
        <TextField
          disabled
          id="first_name"
          label={label}
          variant="standard"
          fullWidth
        />
      </div>
    );
  }

  const options = formatOptions(data, isDiff, diffName, nullable);

  // Determine the initial value to be the first item in the options array
  // If the component is controlled and a value is provided, use that value

  const initialValue = value
    ? options.find((option) => option.id === value)
    : options[0];

  return (
    <div className="flex-1">
      <Autocomplete
        id="first_name"
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="standard" fullWidth />
        )}
        onChange={(event, newValue) => {
          onChange(newValue ? newValue : null);
        }}
        // Set the initial value to the first item in the options array
        defaultValue={initialValue}
      />
    </div>
  );
}
