import { TextField } from "@mui/material";
import SelectSearch from "@/app/components/global/SearchSelect";

const GenericInput = ({ type, value, onChange, options, label }) => {
  if (type === "select") {
    return (
      <SelectSearch
        isDiff={true}
        diffName={"value"}
        data={options}
        onChange={onChange}
        label={label}
      />
    );
  } else if (type === "text") {
    return (
      <div className="flex-1 mb-6">
        <TextField
          onChange={(e) => onChange(e.target.value)}
          required
          className=""
          size="small"
          id="outlined-basic"
          label={label}
          variant="standard"
          fullWidth
          value={value}
        />
      </div>
    );
  }
  return null;
};

export default GenericInput;
