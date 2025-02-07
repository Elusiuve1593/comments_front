import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { Logout } from "../auth/logout/Logout";

export const Header = () => {
  const isAuth: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        width: "100%",
        height: "10%",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            backgroundColor: isAuth ? "#58ec02c8" : "#3b8d0cc7",
          }}
        />
        
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="h6" color="inherit">
            COMMENTS APP
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginRight: "4%",
          }}
        >
          {isAuth ? (
            <Logout />
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/sign-in")}>
                Login
              </Button>
              /
              <Button color="inherit" onClick={() => navigate("/sign-up")}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
