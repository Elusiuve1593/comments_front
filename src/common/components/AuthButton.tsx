import Button from "@mui/material/Button";
import { memo } from "react";

interface AuthButtonProps {
  isValid: boolean;
  text: string;
}

export const AuthButton = memo(({ isValid, text }: AuthButtonProps) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={!isValid}
      sx={{ marginBottom: 2 }}
    >
      {text}
    </Button>
  );
});
