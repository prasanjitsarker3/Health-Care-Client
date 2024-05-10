import * as React from "react";
import { SxProps, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type IFileProps = {
  name: string;
  label?: string;
  sx?: SxProps;
};
const FromFileUpload = ({ name, label, sx }: IFileProps) => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => {
          return (
            <Button
              fullWidth={true}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ ...sx }}
            >
              {label || "Upload file"}
              <Input
                fullWidth={true}
                type={name}
                {...field}
                value={value?.fileName}
                onChange={(e) =>
                  onChange((e.target as HTMLInputElement).files?.[0])
                }
                style={{ display: "none" }}
              />
            </Button>
          );
        }}
      />
    </>
  );
};

export default FromFileUpload;
