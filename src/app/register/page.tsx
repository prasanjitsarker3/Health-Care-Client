"use client";
import { registerPatient } from "@/Server/Actions/registerPatient";
import { userLogin } from "@/Server/Actions/userLogin";
import { modifyPayload } from "@/Server/Payload/ModifyPayload";
import { storeUserInfo } from "@/components/Utils/AuthService/authService";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IPatientData {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
}

interface IRegisterData {
  password: string;
  patient: IPatientData;
}

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterData>();

  const onSubmit: SubmitHandler<IRegisterData> = async (values) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);
      console.log("Res", res);
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.patient.email,
        });
        console.log("Result", result);

        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Typography textAlign="center" variant="h6" component="h4" pb={2}>
              Please Register In Here
            </Typography>
            <Grid spacing={3} gap={2}>
              <Grid md={12}>
                <TextField
                  {...register("patient.name")}
                  fullWidth={true}
                  size="small"
                  id="name"
                  label="Name"
                  variant="outlined"
                />
              </Grid>
              <Stack direction="row" py={3} gap={3}>
                <Grid sm={12} md={6}>
                  <TextField
                    {...register("patient.email")}
                    fullWidth={true}
                    size="small"
                    id="email"
                    label="Email"
                    variant="outlined"
                  />
                </Grid>
                <Grid sm={12} md={6}>
                  <TextField
                    {...register("password")}
                    fullWidth={true}
                    size="small"
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                  />
                </Grid>
              </Stack>
              <Stack direction="row" gap={3}>
                <Grid md={6}>
                  <TextField
                    {...register("patient.contactNumber")}
                    size="small"
                    id="contact"
                    label="Contact Number"
                    variant="outlined"
                  />
                </Grid>
                <Grid md={6}>
                  <TextField
                    {...register("patient.address")}
                    size="small"
                    id="address"
                    label="Address"
                    variant="outlined"
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
        </form>
      </Box>
    </Grid>
  );
};

export default RegisterPage;
