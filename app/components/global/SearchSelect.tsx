import React, { useEffect, useState } from "react";
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
    data = [{ id: null, name: "بدون انتخاب" }, ...data];
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
  defaultValue,
}) {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    setCurrentValue(defaultValue);
  }, [defaultValue]);

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

  // Ensure the currentValue matches one of the options
  const currentValueObject =
    options.find((option) => option.id === currentValue) || null;

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
          setCurrentValue(newValue ? newValue.id : null);
          onChange(newValue ? newValue : null);
        }}
        value={currentValueObject} // Ensure this matches one of the options
      />
    </div>
  );
}
