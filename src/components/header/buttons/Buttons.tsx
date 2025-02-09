import { Box, Button, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Logout } from "../../auth/logout/Logout";
import { useNavigate } from "react-router-dom";

interface ButtonsProps {
  isAuth: boolean;
}

export const Buttons = ({ isAuth }: ButtonsProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {!isAuth ? (
          <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <HomeIcon />
          </Box>
        ) : null}
        <Box
          sx={{ display: "flex", marginRight: "45px", alignItems: "center" }}
        >
          {isAuth ? (
            <Logout />
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/sign-in")}>
                Sign In
              </Button>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Button color="inherit" onClick={() => navigate("/sign-up")}>
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
