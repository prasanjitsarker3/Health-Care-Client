"use client";
import React from "react";
import FromInput from "@/components/From/FromInput";
import FromProvider from "@/components/From/FromProvider";
import FromSelectOption from "@/components/From/FromSelectOption";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { Gender } from "@/components/Types/DoctorType";
import {
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,
} from "@/Redux/AdminApi/doctorApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type IParams = {
  params: {
    doctorId: string;
  };
};

const DoctorUpdatePage = ({ params }: IParams) => {
  const { data, isLoading } = useGetSingleDoctorQuery(params.doctorId);
  const [updateDoctor] = useUpdateDoctorMutation();
  const router = useRouter();
  const id = params?.doctorId;
  const defaultValue = {
    name: data?.name || "",
    email: data?.email || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    registrationNumber: data?.registrationNumber || "",
    experience: data?.experience || 0,
    gender: data?.gender || "",
    appointmentFree: data?.appointmentFree || 0,
    qualification: data?.qualification || "",
    currentWorkingPlace: data?.currentWorkingPlace || "",
    designaton: data?.designaton || "",
  };

  const handleUpdateDoctor = async (values: FieldValues) => {
    values.experience = Number(values.experience);
    values.appointmentFree = Number(values.appointmentFree);
    values.id = id;
    try {
      const res = await updateDoctor({ id: values.id, body: values }).unwrap();
      if (res?.id) {
        toast.success("Doctor Updated Successfully!!!");
        router.push("/dashboard/admin/doctors");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <Box py={3}>
      <Typography
        sx={{
          marginLeft: 3,
          paddingBottom: 2,
        }}
        variant="h6"
        component="h3"
      >
        Update Doctor
      </Typography>
      {data ? (
        <FromProvider
          onSubmit={handleUpdateDoctor}
          defaultValues={data && defaultValue}
        >
          <Grid container spacing={4} sx={{ px: 3 }}>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput label="Name" name="name" fullWidth={true} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Email"
                name="email"
                type="email"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Contact Number"
                name="contactNumber"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput label="Address" name="address" fullWidth={true} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Registration Number"
                name="registrationNumber"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Experience Years"
                name="experience"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromSelectOption
                label="Gender Check"
                item={Gender}
                name="gender"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="AppointmentFree"
                name="appointmentFree"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Qualification"
                name="qualification"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Current Working Place"
                name="currentWorkingPlace"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FromInput
                label="Designation"
                name="designaton"
                fullWidth={true}
              />
            </Grid>
          </Grid>
          <Box textAlign="center" mt={3}>
            <Button type="submit">Update Doctor Information</Button>
          </Box>
        </FromProvider>
      ) : (
        "Loading..."
      )}
    </Box>
  );
};

export default DoctorUpdatePage;
