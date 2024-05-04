import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assests/landing_page/facebook.png";
import linkedinIcon from "@/assests/landing_page/linkedin.png";
import twitterIcon from "@/assests/landing_page/twitter.png";
import instagramIcon from "@/assests/landing_page/instagram.png";

const Footer = () => {
  return (
    <div className=" bg-slate-900 py-12">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          gap={3}
          justifyContent="center"
          py={3}
        >
          <Typography component={Link} href="consultation" color="white">
            Consultation
          </Typography>
          <Typography color="white">Health Plans</Typography>
          <Typography color="white">Medicine</Typography>
          <Typography color="white">Diagnostics</Typography>
          <Typography color="white">NGOS</Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap={3}
          justifyContent="center"
          py={1}
        >
          <Image width={30} height={30} src={facebookIcon} alt="facebook" />
          <Image width={30} height={30} src={linkedinIcon} alt="facebook" />
          <Image width={30} height={30} src={twitterIcon} alt="facebook" />
          <Image width={30} height={30} src={instagramIcon} alt="facebook" />
        </Stack>
        <div className=" border-b-[1px] border-dashed pt-4"></div>
      </Container>
    </div>
  );
};

export default Footer;
