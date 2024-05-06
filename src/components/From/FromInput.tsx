import { SxProps, TextField } from "@mui/material";
import React from "react";
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
};

const FromInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  required,
  sx,
}: IFromInput) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            sx={{ ...sx }}
            {...field}
            fullWidth={fullWidth}
            type={type}
            size={size}
            label={label}
            variant="outlined"
            name={name}
            required={required}
            placeholder={label}
            error={!!error?.message}
            helperText={error?.message}
          />
        )}
      />
    </>
  );
};

export default FromInput;
