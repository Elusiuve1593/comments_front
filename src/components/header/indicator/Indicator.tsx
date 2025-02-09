import { Box, Typography } from "@mui/material";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

interface IndicatorProps {
  isAuth: boolean;
}

export const Indicator = ({ isAuth }: IndicatorProps) => {
  const username = useSelector((state: RootState) => state.profile.username);
  return (
    <>
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
    </>
  );
};
