import { AppBar, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileThunk } from "../../redux/slices/user/operations";
import { AppDispatch, RootState } from "../../redux/store";
import { Buttons } from "./buttons/Buttons";
import { Indicator } from "./indicator/Indicator";

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

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
        <Indicator isAuth={isAuth} />
        <Buttons isAuth={isAuth} />
      </Toolbar>
    </AppBar>
  );
};
