import { TextField } from "@mui/material";
import SelectSearch from "@/app/components/global/SearchSelect";

const GenericInput = ({
  type,
  value,
  onChange,
  options,
  label,
  defaultValue,
  disabled = false,
}) => {
  if (type === "select") {
    return (
      <div className="flex-1 mb-8">
        <SelectSearch
          disabled={disabled}
          isDiff={true}
          diffName={"value"}
          data={options}
          onChange={onChange}
          label={label}
          defaultValue={defaultValue}
        />
      </div>
    );
  } else if (type === "text") {
    return (
      <div className="flex-1 mb-4">
        <TextField
          onChange={(e) => onChange(e.target.value)}
          required
          disabled={disabled}
          className=""
          size="small"
          id="outlined-basic"
          label={label}
          variant="outlined"
          fullWidth
          value={defaultValue}
        />
      </div>
    );
  }
  return null;
};

export default GenericInput;
