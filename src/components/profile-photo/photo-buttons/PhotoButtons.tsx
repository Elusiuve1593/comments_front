import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { memo } from "react";
import { CancelButton } from "../../../common/components/CancelButton";
import { SaveButton } from "../../../common/components/SaveButton";

interface PhotoButtonProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSavePhoto: () => Promise<void>;
  toggleEditProfilePhoto: () => void;
}

export const PhotoButtons = memo(
  ({
    handleFileChange,
    handleSavePhoto,
    toggleEditProfilePhoto,
  }: PhotoButtonProps) => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" sx={{marginTop:-10}}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-photo"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-photo">
          <Button variant="outlined" component="span" sx={{ mb: 2, mt: 10 }}>
            Choose Photo
          </Button>
        </label>
        <Box display="flex" gap={1} justifyContent="center">
          <CancelButton
            icon={<CancelIcon />}
            callback={toggleEditProfilePhoto}
          />
          <SaveButton
            text={"Save"}
            buttonType={"button"}
            icon={<SaveIcon />}
            callback={handleSavePhoto}
          />
        </Box>
      </Box>
    );
  }
);
