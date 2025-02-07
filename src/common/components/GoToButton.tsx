import { Theme, SxProps, styled } from "@mui/material";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

interface GoToButtonProps {
  text: string;
  direction: string;
  style?: SxProps<Theme> | undefined;
}

export const GoToButton = memo(
  ({ text, direction, style }: GoToButtonProps) => {
    return (
      <Grid item>
        <Button
          component={styled(NavLink)({
            textDecoration: "none",
            color: "inherit",
            "&:hover": {
              textDecoration: "none",
              color: "#fff",
            },
          })}
          to={direction}
          variant="contained"
          sx={style}
        >
          {text}
        </Button>
      </Grid>
    );
  }
);