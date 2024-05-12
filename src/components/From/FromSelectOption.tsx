import { MenuItem, Select, SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
type IFromInput = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  required?: boolean;
  sx?: SxProps;
  placeholder?: string;
  item: string[];
};

const FromSelectOption = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  required,
  sx,
  item,
}: IFromInput) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          sx={{ ...sx }}
          {...field}
          fullWidth={fullWidth}
          type={type}
          size={size}
          select
          label={label}
          variant="outlined"
          name={name}
          required={required}
          placeholder={label}
          error={isError}
          helperText={
            isError ? (formState.errors[name]?.message as string) : ""
          }
        >
          {item.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default FromSelectOption;
