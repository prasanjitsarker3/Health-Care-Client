import Banner from "@/components/Utils/Shared/UI/HomePage/Banner";
import DoctorSpecialist from "@/components/Utils/Shared/UI/HomePage/DoctorSpecialist";
import TopDoctor from "@/components/Utils/Shared/UI/HomePage/TopDoctor";
import WhyUs from "@/components/Utils/Shared/UI/HomePage/WhyUs";

const HomePage = () => {
  // console.log("Hello");
  return (
    <>
      <Banner />
      <DoctorSpecialist />
      <TopDoctor />
      <WhyUs />
    </>
  );
};

export default HomePage;
