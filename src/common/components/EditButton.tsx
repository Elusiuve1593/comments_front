import Button from "@mui/material/Button";
import { memo } from "react";

interface EditButtonProps {
  variantButton: "contained" | "outlined" | "text";
  text: string;
  callback?: (id?: number | undefined) => void;
  id?: number | undefined;
  sizeButton?: "large" | "small" | "medium";
  icon?: any;
}

export const EditButton = memo(
  ({
    variantButton,
    text,
    callback,
    id,
    sizeButton,
    icon,
  }: EditButtonProps) => {
    return (
      <Button
        size={sizeButton}
        variant={variantButton}
        onClick={() => callback && callback(id)}
        startIcon={icon}
        sx={{ marginTop: "20px" }}
      >
        {text}
      </Button>
    );
  }
);
