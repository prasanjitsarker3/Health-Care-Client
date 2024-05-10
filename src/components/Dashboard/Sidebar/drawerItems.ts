import { DrawerItem, USER_ROLE, UserRole } from "../Common/common";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import { adminRoutes } from "../Routes/admin.routes";
import { superAdminRoutes } from "../Routes/superAdmi.routes";
import { doctorRoutes } from "../Routes/doctor.routes";
import { patientRoutes } from "../Routes/patient.routes";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];
  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(...superAdminRoutes(role));
      break;
    case USER_ROLE.ADMIN:
      roleMenus.push(...adminRoutes(role));
      break;
    case USER_ROLE.DOCTOR:
      roleMenus.push(...doctorRoutes(role));
      break;
    case USER_ROLE.PATIENT:
      roleMenus.push(...patientRoutes(role));
      break;

    default:
      break;
  }
  return [...roleMenus];
};
