import { DrawerItem } from "../Common/common";
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
import Link from "next/link";
import { usePathname } from "next/navigation";

type IProps = {
  item: DrawerItem;
  index: number;
};
const SidebarItems = ({ item, index }: IProps) => {
  const pathLink = `/dashboard/${item?.path}`;
  const pathName = usePathname();
  return (
    <Link href={pathLink}>
      <ListItem
        key={index}
        disablePadding
        sx={{
          ...(pathLink === pathName
            ? {
                backgroundColor: "#1586FD",
                color: "white",
                "& svg": {
                  color: "white",
                },
              }
            : {}),
          marginBottom: 1,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItems;
