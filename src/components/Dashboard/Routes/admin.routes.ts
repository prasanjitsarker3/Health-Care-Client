import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RateReviewIcon from "@mui/icons-material/RateReview";

export const adminRoutes = (role: string) => {
  return [
    {
      title: "Dashboard",
      path: `${role}`,
      icon: DashboardIcon,
    },
    {
      title: "Doctor",
      path: `${role}/doctors`,
      icon: GroupIcon,
    },
    {
      title: "Specialties",
      path: `${role}/specialties`,
      icon: FolderSpecialIcon,
    },
    {
      title: "Schedules",
      path: `${role}/schedules`,
      icon: CalendarMonthIcon,
    },
    {
      title: "Appointments",
      path: `${role}/appointments`,
      icon: CalendarMonthIcon,
    },
    {
      title: "Reviews",
      path: `${role}/reviews`,
      icon: RateReviewIcon,
    },
  ];
};
