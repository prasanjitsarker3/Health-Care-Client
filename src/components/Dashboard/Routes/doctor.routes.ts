import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ScheduleIcon from "@mui/icons-material/Schedule";

export const doctorRoutes = (role: string) => {
  return [
    {
      title: "Dashboard",
      path: `${role}`,
      icon: DashboardIcon,
    },
    {
      title: "Schedule",
      path: `${role}/schedules`,
      icon: ScheduleIcon,
    },
    {
      title: "Appointment",
      path: `${role}/appointments`,
      icon: CollectionsBookmarkIcon,
    },
  ];
};
