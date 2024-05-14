"use client";
import SidebarDashboard from "@/components/Dashboard/SideDashboard/SidebarDashboard";
import { isLoggedIn } from "@/components/Utils/AuthService/authService";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // if (!isLoggedIn()) {
  //   return router.push("/login");
  // }
  return <SidebarDashboard>{children}</SidebarDashboard>;
};

export default DashboardLayout;
