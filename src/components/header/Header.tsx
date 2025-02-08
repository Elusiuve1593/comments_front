import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
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
        <Box
          sx={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            backgroundColor: isAuth ? "#58ec02c8" : "#3b8d0cc7",
          }}
        />
        {isAuth ? (
          <Typography variant="h6" color="inherit" sx={{ marginLeft: "1%" }}>
            {username}
          </Typography>
        ) : null}
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="h6" color="inherit">
            <div>COMMENTS</div>
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 0,
            textAlign: "center",
            marginRight: "2%",
            cursor: "pointer",
          }}
        >
          <span onClick={() => navigate("/")}>
            <HomeIcon />
          </span>
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
                Sign In
              </Button>
              /
              <Button color="inherit" onClick={() => navigate("/sign-up")}>
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
