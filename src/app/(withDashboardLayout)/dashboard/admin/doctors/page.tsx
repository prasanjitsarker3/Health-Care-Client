"use client";
import React, { useState } from "react";
import DoctorModel from "./components/DoctorModel";
import {
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import {
  useDeleteDoctorMutation,
  useGetDoctorsQuery,
} from "@/Redux/AdminApi/doctorApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDebounced } from "@/Redux/hooks";
import { toast } from "sonner";

const AdminPanelDoctor = () => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [deleteDoctor] = useDeleteDoctorMutation();
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounced({
    searchTerm: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetDoctorsQuery({ ...query });

  const doctorData = data?.doctor;
  console.log(doctorData);
  const meta = data?.doctor;

  const handleDeleteDoctor = async (id: string) => {
    try {
      const res = await deleteDoctor(id).unwrap();
      if (res?.id) {
        toast.success("Delete Successfully Doctor");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong !");
      console.log(err.message);
    }
  };
  const handleViewDoctor = (id: string) => {
    console.log("View", id);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "designaton", headerName: "Designation", flex: 1 },
    { field: "qualification", headerName: "Qualification", flex: 1 },
    { field: "appointmentFree", headerName: "Free", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box gap={3}>
            <IconButton
              onClick={() => handleDeleteDoctor(row.id)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>

            <IconButton
              onClick={() => handleViewDoctor(row.id)}
              aria-label="visibility"
            >
              <VisibilityIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        justifyItems="center"
      >
        <Button onClick={() => setIsModelOpen(true)}>Create Doctor</Button>
        <DoctorModel open={isModelOpen} setOpen={setIsModelOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          id="outlined-basic"
          label="Search..."
          variant="outlined"
        />
      </Stack>

      <Box my={5}>
        {!isLoading ? (
          <DataGrid
            //@ts-ignore
            rows={doctorData?.data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          />
        ) : (
          <Skeleton
            sx={{ borderRadius: 2 }}
            variant="rectangular"
            width="100%"
            height={340}
          />
        )}
      </Box>
    </Box>
  );
};

export default AdminPanelDoctor;
