import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";

export const doctorRoutes = (role: string) => {
  return [
    {
      title: "Dashboard",
      path: `${role}`,
      icon: DashboardIcon,
    },
    {
      title: "Schedule",
      path: `${role}/schedule`,
      icon: GroupIcon,
    },
  ];
};
