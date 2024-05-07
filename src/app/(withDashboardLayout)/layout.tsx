import SidebarDashboard from "@/components/Dashboard/SideDashboard/SidebarDashboard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <SidebarDashboard>{children}</SidebarDashboard>;
};

export default DashboardLayout;
