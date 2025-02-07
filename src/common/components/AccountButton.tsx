import { memo } from "react";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

interface AccountButtonProps {
  text: string;
  direction: string;
  page: string;
}

export const AccountButton = memo(
  ({ text, direction, page }: AccountButtonProps) => {
    return (
      <Typography variant="body1">
        {text} <NavLink to={direction}>{page}</NavLink>
      </Typography>
    );
  }
);
