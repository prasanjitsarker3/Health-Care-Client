"use client";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Image from "next/image";
import { drawerItems } from "./drawerItems";
import { UserRole } from "../Common/common";
import SidebarItems from "./SidebarItems";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/components/Utils/AuthService/authService";
import Link from "next/link";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const { role } = getUserInfo();
    setUserRole(role);
  }, []);
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="center"
        justifyItems="center"
        alignItems="center"
        py={1}
        gap={2}
        component={Link}
        href="/"
        sx={{
          cursor: "pointer",
        }}
      >
        <Image
          width={30}
          height={30}
          src="https://cdn-icons-png.flaticon.com/128/2870/2870945.png"
          alt="dashboardLogo"
        />
        <Typography variant="h6" component="h1">
          Health Care
        </Typography>
      </Stack>
      <List>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <SidebarItems key={index} index={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
