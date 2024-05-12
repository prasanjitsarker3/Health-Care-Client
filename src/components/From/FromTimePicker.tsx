import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type ITimePicker = {
  name: string;
  label?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  required?: boolean;
  sx?: SxProps;
};

const FromTimePicker = ({
  name,
  label,
  size = "small",
  fullWidth = true,
  required,
  sx,
}: ITimePicker) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            timezone="system"
            disablePast
            {...field}
            value={value || Date.now()}
            onChange={(time) => onChange(time)}
            slotProps={{
              textField: {
                required: required,
                label: label,
                size: size,
                sx: { ...sx },
                variant: "outlined",
                fullWidth: fullWidth,
                error: isError,
                helperText: isError
                  ? (formState.errors[name]?.message as string)
                  : "",
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default FromTimePicker;
