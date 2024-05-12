import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type IDatePicker = {
  name: string;
  label?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  required?: boolean;
  sx?: SxProps;
};

const FromDatePicker = ({
  name,
  label,
  size = "small",
  fullWidth = true,
  required,
  sx,
}: IDatePicker) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            timezone="system"
            disablePast
            {...field}
            value={value || Date.now()}
            onChange={(date) => onChange(date)}
            slotProps={{
              textField: {
                required: required,
                label: label,
                size: size,
                sx: { ...sx },
                variant: "outlined",
                fullWidth: fullWidth,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default FromDatePicker;
