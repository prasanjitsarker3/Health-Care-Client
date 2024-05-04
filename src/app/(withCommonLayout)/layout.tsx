import Footer from "@/components/Utils/Shared/Footer/Footer";
import Navbar from "@/components/Utils/Shared/Navbar/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className=" min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
