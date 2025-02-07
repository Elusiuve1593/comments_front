import Button from "@mui/material/Button";
import { memo } from "react";

interface CancelButtonProps {
  icon?: any;
  callback: () => void;
}

export const CancelButton = memo(({ icon, callback }: CancelButtonProps) => {
  return (
    <Button
      type="button"
      variant="outlined"
      color="secondary"
      startIcon={icon}
      onClick={callback}
    >
      Cancel
    </Button>
  );
});
