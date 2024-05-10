import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
export const patientRoutes = (role: string) => {
  return [
    {
      title: "Dashboard",
      path: `${role}`,
      icon: DashboardIcon,
    },
    {
      title: "Appointment",
      path: `${role}/appointment`,
      icon: GroupIcon,
    },
  ];
};
