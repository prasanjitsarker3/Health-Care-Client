"use client";
import {
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ScheduleModel from "./components/ScheduleModel";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useDeleteScheduleMutation,
  useGetAllScheduleQuery,
} from "@/Redux/AdminApi/scheduleApi";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { dateFormatter } from "@/components/Utils/UtilsFun/dateFormate";
import dayjs from "dayjs";
import { scheduler } from "timers/promises";
import { toast } from "sonner";

const AdminPanelSchedule = () => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const [deleteSchedule] = useDeleteScheduleMutation();
  const { data, isLoading } = useGetAllScheduleQuery({});

  useEffect(() => {
    const updateData = data?.data?.map((schedule: any) => {
      return {
        id: schedule.id,
        startDate: dateFormatter(schedule.startDate),
        endDate: dateFormatter(schedule.endDate),
        startTime: dayjs(schedule?.startDate).format("hh:mm a"),
        endTime: dayjs(schedule?.endDate).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [data]);

  const handleDeleteSchedule = async (id: string) => {
    console.log(id);
    try {
      const res = await deleteSchedule(id).unwrap();
      console.log("res", res);
      if (res?.id) {
        toast.success("Schedule Delete Successfully");
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };
  const columns: GridColDef[] = [
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "endTime", flex: 1 },
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
              onClick={() => handleDeleteSchedule(row.id)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
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
        <Button size="small" onClick={() => setIsModelOpen(true)}>
          Create Schedule
        </Button>
        <ScheduleModel open={isModelOpen} setOpen={setIsModelOpen} />
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
            //@ts-ignore
            rows={allSchedule ?? []}
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

export default AdminPanelSchedule;
