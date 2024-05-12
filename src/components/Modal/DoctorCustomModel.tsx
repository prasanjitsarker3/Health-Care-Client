"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, IconButton, Input, Typography } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
type IDoctorModelProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  title?: string;
};

const DoctorCustomModel = ({
  open,
  setOpen,
  children,
  title,
}: IDoctorModelProps) => {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <GridCloseIcon />
          </IconButton>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            {/* <Button autoFocus onClick={handleClose}>
              Save changes
            </Button> */}
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    </>
  );
};

export default DoctorCustomModel;
