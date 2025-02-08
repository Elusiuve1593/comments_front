import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { Logout } from "../auth/logout/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect } from "react";
import { fetchProfileThunk } from "../../redux/slices/user/operations";

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const username = useSelector((state: RootState) => state.profile.username);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfileThunk());
  }, []);

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              backgroundColor: isAuth ? "#58ec02c8" : "#3b8d0cc7",
              marginRight: 1,
            }}
          />
          {isAuth && <Typography color="inherit">{username}</Typography>}
        </Box>

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
      </Toolbar>
    </AppBar>
  );
};
