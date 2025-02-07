import Button from "@mui/material/Button";
import { memo } from "react";

interface SaveButtonProps {
  text: string;
  buttonType: "button" | "reset" | "submit";
  icon?: any;
  isValid?: boolean;
  callback?: () => void;
}

export const SaveButton = memo(
  ({ text, buttonType, icon, isValid, callback }: SaveButtonProps) => {
    return (
      <Button
        type={buttonType}
        variant="outlined"
        color="primary"
        startIcon={icon}
        disabled={isValid}
        onClick={callback}
      >
        {text}
      </Button>
    );
  }
);
