"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import SpecialtiesModel from "./components/SpecialtlyModel";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useDeleteSpecialtiesMutation,
  useGetAllSpecialtiesQuery,
} from "@/Redux/Specialties/specialitiesApi";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";

const AdminPanelSpecialties = () => {
  const [isOpenModel, setIsOpenModel] = useState<boolean>(false);
  const { data, isLoading } = useGetAllSpecialtiesQuery(undefined);
  const [deleteSpecialties] = useDeleteSpecialtiesMutation();

  const handleDeleteSpecialties = async (id: string) => {
    try {
      const res = await deleteSpecialties(id).unwrap();
      if (res?.id) {
        toast.success("Specialties Deleted Successfully !");
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 400 },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Image src={row.icon} alt="" width={20} height={20} />
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton
            onClick={() => handleDeleteSpecialties(row.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button variant="outlined" onClick={() => setIsOpenModel(true)}>
          Create Specialties
        </Button>
        <SpecialtiesModel open={isOpenModel} setOpen={setIsOpenModel} />
        <TextField
          size="small"
          id="outlined-basic"
          label="Search..."
          variant="outlined"
        />
      </Stack>
      <Box my={5}>
        {!isLoading ? (
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        ) : (
          <h1>Loading ... </h1>
        )}
      </Box>
    </Box>
  );
};

export default AdminPanelSpecialties;
