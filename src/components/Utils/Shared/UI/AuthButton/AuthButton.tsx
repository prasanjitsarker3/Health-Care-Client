import {
  getUserInfo,
  removeUser,
} from "@/components/Utils/AuthService/authService";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();

  const handleLogoutUser = () => {
    removeUser();
    router.refresh();
  };
  return (
    <>
      {userInfo?.id ? (
        <Button
          onClick={handleLogoutUser}
          size="small"
          color="error"
          variant="contained"
          style={{ backgroundColor: "#EA425C", color: "white" }}
        >
          Logout
        </Button>
      ) : (
        <Button
          component={Link}
          href="/login"
          size="small"
          variant="contained"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
