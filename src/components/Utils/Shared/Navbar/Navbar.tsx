"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const AuthButton = dynamic(() => import("../UI/AuthButton/AuthButton"), {
    ssr: false,
  });
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box
      width="100%"
      position="fixed"
      top={0}
      zIndex={20}
      bgcolor={scrolled ? "white" : "transparent"}
    >
      <Container>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems="center"
          py={3}
          // bgcolor={"white"}
          width="100%"
        >
          <Stack direction="row" gap={2} component={Link} href="/">
            <Image
              width={30}
              height={30}
              src="https://cdn-icons-png.flaticon.com/128/2870/2870945.png"
              alt="doclogo"
            />
            <Typography variant="h5" component="h1">
              <Box color="primary.main" component="span">
                Care
              </Box>{" "}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" gap={3}>
            <Typography component={Link} href="consultation">
              Consultation
            </Typography>
            <Typography>Health Plans</Typography>
            <Typography>Medicine</Typography>
            <Typography>Diagnostics</Typography>
            <Typography>NGOS</Typography>
          </Stack>
          <Box>
            <AuthButton />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
