"use client";
import { registerPatient } from "@/Server/Actions/registerPatient";
import { userLogin } from "@/Server/Actions/userLogin";
import { modifyPayload } from "@/Server/Payload/ModifyPayload";
import FromInput from "@/components/From/FromInput";
import FromProvider from "@/components/From/FromProvider";
import { storeUserInfo } from "@/components/Utils/AuthService/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const patientValidationSchema = z.object({
  name: z.string().min(1, "Name is required !"),
  email: z.string().email("Email is required!"),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please provide valid phone number!"),
  address: z.string().min(1, "Please enter your address!"),
});
const registerValidationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters !"),
  patient: patientValidationSchema,
});

const defaultValue = {
  password: "",
  patient: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
};
const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const toastId = toast.loading("Register In...");
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);
      if (res?.data?.id) {
        // toast.success(res?.message);
        toast.success(res?.message, { id: toastId, duration: 2000 });
        const result = await userLogin({
          password: values.password,
          email: values.patient.email,
        });

        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      } else {
        toast.error(res.message, { id: toastId, duration: 2000 });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
      sx={{
        backgroundImage: `url('https://img.freepik.com/free-vector/medical-treatment-tools-composition_1284-16379.jpg?t=st=1714769751~exp=1714773351~hmac=814e51b42170a4c5da22dbcccd35fcc954697304c6f4b9a920fd378b2d65fdc1&w=740')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box p={5} boxShadow={1} bgcolor="white" borderRadius={1}>
        <FromProvider
          onSubmit={handleRegister}
          resolver={zodResolver(registerValidationSchema)}
          defaultValues={defaultValue}
        >
          <Stack>
            <Typography textAlign="center" variant="h6" component="h4" pb={2}>
              Please Register In Here
            </Typography>
            <Grid spacing={3} gap={2}>
              <Grid md={12}>
                <FromInput name="patient.name" fullWidth={true} label="Name" />
              </Grid>
              <Stack direction="row" py={3} gap={3}>
                <Grid sm={12} md={6}>
                  <FromInput
                    type="email"
                    name="patient.email"
                    fullWidth={true}
                    label="Email"
                  />
                </Grid>
                <Grid sm={12} md={6}>
                  <FromInput
                    name="password"
                    fullWidth={true}
                    type="password"
                    label="Password"
                  />
                </Grid>
              </Stack>
              <Stack direction="row" gap={3}>
                <Grid md={6}>
                  <FromInput
                    fullWidth={true}
                    name="patient.contactNumber"
                    label="Contact Number"
                  />
                </Grid>
                <Grid md={6}>
                  <FromInput
                    name="patient.address"
                    label="Address"
                    fullWidth={true}
                  />
                </Grid>
              </Stack>
            </Grid>
            <Button
              type="submit"
              fullWidth={true}
              sx={{
                marginTop: 2,
              }}
            >
              Register
            </Button>
            <Typography component="p" pt={1}>
              Do you already have an account?{" "}
              <span style={{ color: "blue" }}>
                <Link href="/login">Login</Link>
              </span>
            </Typography>
          </Stack>
        </FromProvider>
      </Box>
    </Grid>
  );
};

export default RegisterPage;
