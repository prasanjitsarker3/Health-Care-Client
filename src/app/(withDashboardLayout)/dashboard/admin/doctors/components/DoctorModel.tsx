"use client";
import { useCreateDoctorsMutation } from "@/Redux/AdminApi/doctorApi";
import { modifyPayload } from "@/Server/Payload/ModifyPayload";
import FromInput from "@/components/From/FromInput";
import FromProvider from "@/components/From/FromProvider";
import FromSelectOption from "@/components/From/FromSelectOption";
import DoctorCustomModel from "@/components/Modal/DoctorCustomModel";
import { Gender } from "@/components/Types/DoctorType";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
type IDoctorModelProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValue = {
  password: "",
  doctor: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
    registrationNumber: "",
    experience: 0,
    gender: "",
    appointmentFree: 0,
    qualification: "",
    currentWorkingPlace: "",
    designaton: "",
  },
};
const DoctorModel = ({ open, setOpen }: IDoctorModelProps) => {
  const [createDoctor] = useCreateDoctorsMutation();
  const handleCreateDoctor = async (values: FieldValues) => {
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.appointmentFree = Number(values.doctor.appointmentFree);
    const data = modifyPayload(values);

    try {
      const res = await createDoctor(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Create Doctor Successfully !");
        setOpen(false);
      }
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message || "Something went wrong!");
    }
  };
  return (
    <div>
      <DoctorCustomModel open={open} setOpen={setOpen} title="Create Doctor">
        <FromProvider
          onSubmit={handleCreateDoctor}
          defaultValues={defaultValue}
        >
          <Grid container spacing={4} sx={{ px: 3 }}>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput label="Name" name="doctor.name" fullWidth={true} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Email"
                name="doctor.email"
                type="email"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Password"
                name="password"
                type="password"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Contact Number"
                name="doctor.contactNumber"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Address"
                name="doctor.address"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Registration Number"
                name="doctor.registrationNumber"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Experience Years"
                name="doctor.experience"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromSelectOption
                label="Gender Check"
                item={Gender}
                name="doctor.gender"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="AppointmentFree"
                name="doctor.appointmentFree"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Qualification"
                name="doctor.qualification"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Current Working Place"
                name="doctor.currentWorkingPlace"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Designation"
                name="doctor.designaton"
                fullWidth={true}
              />
            </Grid>
          </Grid>
          <Box textAlign="center" mt={3}>
            <Button type="submit">Create Doctor</Button>
          </Box>
        </FromProvider>
      </DoctorCustomModel>
    </div>
  );
};

export default DoctorModel;
