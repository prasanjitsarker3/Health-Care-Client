import {
  useCreateScheduleMutation,
  useGetAllScheduleQuery,
} from "@/Redux/AdminApi/scheduleApi";
import FromDatePicker from "@/components/From/FromDatePicker";
import FromProvider from "@/components/From/FromProvider";
import FromTimePicker from "@/components/From/FromTimePicker";
import CusModal from "@/components/Modal/CusModal";
import { dateFormatter } from "@/components/Utils/UtilsFun/dateFormate";
import { timeFormatter } from "@/components/Utils/UtilsFun/timeFormate";
import { Box, Button, Grid, TextField } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type ISchedule = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ScheduleModel = ({ open, setOpen }: ISchedule) => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleCreateSchedule = async (values: FieldValues) => {
    const toastId = toast.loading("Creating Schedule ...");
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    try {
      const res = await createSchedule(values).unwrap();
      console.log(res);
      if (res.length > 0) {
        toast.success("Schedule Create Successfully", {
          id: toastId,
          duration: 2000,
        });

        setOpen(false);
      }
    } catch (err: any) {
      console.log(err.message);
      toast.error(err?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <CusModal open={open} setOpen={setOpen} title="Create Doctor Schedule">
      <FromProvider onSubmit={handleCreateSchedule}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <FromDatePicker name="startDate" label="Start Date" />
          </Grid>
          <Grid item md={6}>
            <FromDatePicker name="endDate" label="End Date" />
          </Grid>
          <Grid item md={6}>
            <FromTimePicker name="startTime" label="Start Time" />
          </Grid>
          <Grid item md={6}>
            <FromTimePicker name="endTime" label="End Time" />
          </Grid>
        </Grid>
        <Box textAlign="center" mt={3}>
          <Button type="submit">Create Schedule</Button>
        </Box>
      </FromProvider>
    </CusModal>
  );
};

export default ScheduleModel;
