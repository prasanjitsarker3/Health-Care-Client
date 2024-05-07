import { DrawerItem, USER_ROLE, UserRole } from "../Common/common";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import { adminRoutes } from "../AdminRoutes/admin.routes";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];
  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage User",
          path: `${role}/manage-users`,
          icon: GroupIcon,
        }
      );
      break;
    case USER_ROLE.ADMIN:
      roleMenus.push(...adminRoutes(role));
      break;
    case USER_ROLE.DOCTOR:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Schedule",
          path: `${role}/schedule`,
          icon: GroupIcon,
        }
      );
      break;
    case USER_ROLE.PATIENT:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Appointment",
          path: `${role}/appointment`,
          icon: GroupIcon,
        }
      );
      break;

    default:
      break;
  }
  return [...roleMenus];
};
