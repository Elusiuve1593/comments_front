import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/redux-hooks";
import { uploadImageThunk } from "../../redux/slices/img/operations";
import { AppDispatch, RootState } from "../../redux/store";
import { PhotoAvatar } from "./photo-avatar/PhotoAvatar";
import { PhotoButtons } from "./photo-buttons/PhotoButtons";

export const ProfilePhoto = () => {
  const image: string | null | undefined = useAppSelector(
    (state: RootState) => state.profile.avatar
  );
  const dispatch = useDispatch<AppDispatch>();

  const [isEditingPhoto, setIsEditingPhoto] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const toggleEditProfilePhoto = () => {
    setIsEditingPhoto(!isEditingPhoto);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSavePhoto = async () => {
    if (!selectedFile) {
      toast("Choose a photo, please", {
        icon: <InfoOutlinedIcon />,
        style: {
          background: "#6168",
        },
      });
    }
    if (selectedFile) {
      await dispatch(uploadImageThunk(selectedFile));
      setIsEditingPhoto(!isEditingPhoto);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      sx={{ marginBottom: 3 }}
    >
      {isEditingPhoto ? (
        <PhotoButtons
          handleFileChange={handleFileChange}
          handleSavePhoto={handleSavePhoto}
          toggleEditProfilePhoto={toggleEditProfilePhoto}
        />
      ) : (
        <PhotoAvatar
          image={image}
          toggleEditProfilePhoto={toggleEditProfilePhoto}
        />
      )}
    </Box>
  );
};
