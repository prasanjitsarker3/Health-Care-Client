import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const DoctorSpecialist = async () => {
  let specialData;
  try {
    const res = await fetch("http://localhost:5000/api/v1/specialties", {
      next: {
        revalidate: 30,
      },
    });
    specialData = await res.json();
  } catch (err: any) {
    console.log(err.message);
  }

  return (
    <Container>
      <Box py={2}>
        <Typography pb={1} variant="h4" component="h4" fontWeight={600}>
          Explore Treatments Across Specialties
        </Typography>
        <Typography>Experience Doctors Across All Specialties</Typography>
      </Box>

      <Stack direction="row" gap={5} py={5}>
        {specialData?.data?.map((specialty: any) => (
          <Box
            key={specialty.id}
            sx={{
              flex: 1,
              width: "150px",
              backgroundColor: "rgba(245,245,245,1)",
              border: "1px solid rgba(250, 250,250,1)",
              borderRadius: "10px",
              textAlign: "center",
              padding: "40px 10px",
              "& img": {
                width: "50px",
                height: "50px",
                margin: "0 auto",
              },
              "&:hover": {
                border: "1px solid blue",
                padding: "40px 10px",
              },
            }}
          >
            <Image
              width={100}
              height={100}
              src={specialty?.icon}
              alt="Special Icon"
            />
            <Box>
              <Typography component="p" fontSize={18} fontWeight={600} mt={2}>
                {specialty.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
      <Box display="flex" justifyContent="center" pb={5}>
        <Button variant="outlined">See All</Button>
      </Box>
    </Container>
  );
};

export default DoctorSpecialist;
