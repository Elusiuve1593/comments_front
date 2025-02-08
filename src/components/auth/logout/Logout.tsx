import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../../redux/slices/auth/logout/operations";
import { AppDispatch } from "../../../redux/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logout = async () => {
    const res = await dispatch(logoutThunk());
    if (logoutThunk.fulfilled.match(res)) {
      navigate("/");
    }
  };

  return (
    <Box textAlign={"end"}>
      <Button
        sx={{
          padding: "4px 4px",
          minWidth: "45px",
        }}
        variant="contained"
        color="error"
        onClick={logout}
        size="small"
      >
        <ExitToAppIcon />
      </Button>
    </Box>
  );
};
