import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";

const TopDoctor = async () => {
  let topDoctorData;
  try {
    const res = await fetch(
      "http://localhost:5000/api/v1/doctor?page=1&limit=3"
    );
    topDoctorData = await res.json();
  } catch (err: any) {
    console.log(err.message);
  }

  return (
    <Box
      sx={{
        py: 12,
        // py: 32,
        backgroundColor: "rgba(20,20,20,0.1)",
        // clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)",
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="h4"
          color="primary.main"
          component="h1"
          fontWeight={700}
        >
          Our Top Rated Doctors
        </Typography>
        <Typography component="p" fontWeight={400} fontSize={18} sx={{ mt: 2 }}>
          Access to expert physicians and surgeons, advanced technologies
        </Typography>
        <Typography component="p" fontWeight={400} fontSize={18}>
          and top-quality surgery facilities right here.
        </Typography>
      </Box>
      <Container>
        <Grid
          py={8}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {topDoctorData.data?.data.map((topDoc: any) => (
            <Grid item xs={6} sm={3} md={4} key={topDoc.id}>
              <Card>
                <Box p={2}>
                  <Image
                    width={500}
                    height={100}
                    src={topDoc?.profilePhoto}
                    alt="doctorTop"
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {topDoc?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {topDoc?.qualification}, {topDoc?.designaton}
                  </Typography>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      sx={{ display: "flex", justifyItems: "center" }}
                    >
                      <LocationOnIcon />
                      {topDoc?.currentWorkingPlace}
                    </Typography>
                    <Typography
                      sx={{ display: "flex", justifyItems: "center" }}
                    >
                      <StarIcon />
                      {topDoc?.averageRating}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-around", px: 2, pb: 2 }}
                >
                  <Button fullWidth>Book Now</Button>
                  <Button fullWidth variant="outlined">
                    View Profile
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box display="flex" justifyContent="center">
          <Button variant="outlined">See All</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopDoctor;
