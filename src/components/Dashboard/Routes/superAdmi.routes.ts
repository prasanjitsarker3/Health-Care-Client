import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";

export const superAdminRoutes = (role: string) => {
  return [
    {
      title: "Dashboard",
      path: `${role}`,
      icon: DashboardIcon,
    },
    {
      title: "Manage User",
      path: `${role}/manage-users`,
      icon: GroupIcon,
    },
  ];
};
