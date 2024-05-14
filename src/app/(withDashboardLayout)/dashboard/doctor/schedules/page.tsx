"use client";
import React, { useEffect, useState } from "react";
import DoctorScheduleModel from "./components/DoctorScheduleModel";
import { Box, Button, IconButton, Stack } from "@mui/material";
import {
  useDeleteDoctorScheduleMutation,
  useGetDoctorScheduleQuery,
} from "@/Redux/DoctorApi/doctorScheduleApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "@/components/Utils/UtilsFun/dateFormate";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";

const DoctorSchedules = () => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetDoctorScheduleQuery({});
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation();

  const schedules = data?.data;
  console.log(schedules);
  useEffect(() => {
    const updateData = schedules?.map((schedule: any, index: number) => {
      return {
        sl: index + 1,
        id: schedule?.scheduleId,
        startDate: dateFormatter(schedule?.schedule?.startDate),
        startTime: dayjs(schedule?.startDate).format("hh:mm a"),
        endTime: dayjs(schedule?.endDate).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  const handleDoctorSchedule = async (id: string) => {
    // console.log(row);
    try {
      const res = await deleteDoctorSchedule(id).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Delete Doctor Schedule Successfully");
      }
    } catch (err: any) {
      console.log(err.message);
      toast.error(err?.message || "Something went wrong");
    }
  };

  const columns: GridColDef[] = [
    { field: "sl", headerName: "SL" },
    { field: "startDate", headerName: "Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton
            onClick={() => handleDoctorSchedule(row.id)}
            aria-label="delete"
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box>
      <Stack direction="row">
        <Button onClick={() => setIsModelOpen(true)}>
          Create Doctor Schedule
        </Button>
        <DoctorScheduleModel open={isModelOpen} setOpen={setIsModelOpen} />
      </Stack>
      <Box>
        {!isLoading ? (
          <Box my={2}>
            <DataGrid rows={allSchedule ?? []} columns={columns} />
          </Box>
        ) : (
          <h1>Loading.....</h1>
        )}
      </Box>
    </Box>
  );
};

export default DoctorSchedules;
