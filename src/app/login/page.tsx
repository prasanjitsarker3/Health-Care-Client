"use client";
import { userLogin } from "@/Server/Actions/userLogin";
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
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export interface IPatientLogin {
  email: string;
  password: string;
}

const loginValidationSchema = z.object({
  email: z.string().email("Email is required !"),
  password: z.string().min(6, "Must be at least 6 characters !"),
});

const defaultValue = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();

  const handleSubmitLogin = async (values: FieldValues) => {
    const toastId = toast.loading("Logging In...");
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        // toast.success(res?.message);
        toast.success(res?.message, { id: toastId, duration: 2000 });
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/dashboard");
      } else {
        toast.error(res?.message, { id: toastId, duration: 2000 });
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
        <FromProvider
          onSubmit={handleSubmitLogin}
          resolver={zodResolver(loginValidationSchema)}
          defaultValues={defaultValue}
        >
          <Stack>
            <Typography textAlign="center" variant="h6" component="h4" pb={2}>
              Please Login !
            </Typography>
            <Grid gap={2}>
              <Grid item md={12} pb={3}>
                <FromInput
                  fullWidth={true}
                  size="small"
                  label="Email"
                  name="email"
                />
              </Grid>
              <Grid item md={12}>
                <FromInput
                  fullWidth={true}
                  size="small"
                  type="password"
                  label="Password"
                  name="password"
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
        </FromProvider>
      </Box>
    </Grid>
  );
};

export default LoginPage;
