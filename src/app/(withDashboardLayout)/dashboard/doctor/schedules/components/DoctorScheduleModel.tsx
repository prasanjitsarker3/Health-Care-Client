import CusModal from "@/components/Modal/CusModal";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useGetAllScheduleQuery } from "@/Redux/AdminApi/scheduleApi";
import { Box, Button, Grid, Stack } from "@mui/material";
import FromMultiSelect from "@/components/From/FromMultiSelect";
import { useCreateDoctorScheduleMutation } from "@/Redux/DoctorApi/doctorScheduleApi";
import { toast } from "sonner";

const DoctorScheduleModel = ({ open, setOpen }: any) => {
  const [createDoctorSchedule] = useCreateDoctorScheduleMutation();
  const [selectScheduleIds, setSelectScheduleIds] = useState<string[]>([]);

  const [selectDate, setSelectDate] = useState(dayjs(new Date()).toISOString());

  const query: Record<string, any> = {};
  if (!!selectDate) {
    query["startDate"] = dayjs(selectDate)
      .hour(0)
      .minute(0)
      .millisecond(0)
      .toISOString();
    query["endDate"] = dayjs(selectDate)
      .hour(23)
      .minute(59)
      .millisecond(999)
      .toISOString();
  }
  const { data } = useGetAllScheduleQuery(query);

  const handleCreateDoctorSchedule = async () => {
    try {
      const res = await createDoctorSchedule({
        scheduleIds: selectScheduleIds,
      }).unwrap();
      if (res?.count > 0) {
        toast.success("Successfully create doctor schedule");
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.log(err?.message);
    }
  };
  return (
    <div>
      <CusModal open={open} setOpen={setOpen} title="Create Doctor Schedule">
        <Grid container spacing={3} py={4} px={4}>
          <Grid item md={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Controlled picker"
                value={dayjs(selectDate)}
                onChange={(newValue) =>
                  setSelectDate(dayjs(newValue).toISOString())
                }
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={12}>
            <FromMultiSelect
              schedules={data?.data}
              selectScheduleIds={selectScheduleIds}
              setSelectScheduleIds={setSelectScheduleIds}
            />
          </Grid>
        </Grid>
        <Box textAlign="center">
          <Button onClick={handleCreateDoctorSchedule}>
            Create Doctor Schedule
          </Button>
        </Box>
      </CusModal>
    </div>
  );
};

export default DoctorScheduleModel;
