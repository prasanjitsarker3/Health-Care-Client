"use client";
import { userLogin } from "@/Server/Actions/userLogin";
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
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export interface IPatientLogin {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IPatientLogin>();

  const onSubmit: SubmitHandler<IPatientLogin> = async (values) => {
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/");
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
      <Box py={5} px={12} boxShadow={1} bgcolor="white" borderRadius={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Typography textAlign="center" variant="h6" component="h4" pb={2}>
              Please Login !
            </Typography>
            <Grid gap={2}>
              <Grid item md={12} pb={3}>
                <TextField
                  fullWidth={true}
                  size="small"
                  id="name"
                  label="Email"
                  variant="outlined"
                  {...register("email")}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth={true}
                  size="small"
                  id="name"
                  type="password"
                  label="Password"
                  variant="outlined"
                  {...register("password")}
                />
              </Grid>
            </Grid>
            <Typography component="p" pt={1}>
              Forget Password
            </Typography>
            <Button
              type="submit"
              fullWidth={true}
              sx={{
                marginTop: 2,
              }}
            >
              Login
            </Button>

            <Typography component="p" pt={1}>
              Don;t have an account?{" "}
              <span style={{ color: "blue" }}>
                <Link href="/register">Create an account</Link>
              </span>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Grid>
  );
};

export default LoginPage;
