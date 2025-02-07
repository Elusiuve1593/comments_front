import { createAsyncThunk } from "@reduxjs/toolkit";
import { isLoading } from "../preloader/slice";
import axiosInstance from "../../axios-interceptor";
import { updatePhoto } from "../user/slice";
import { handleAxiosError } from "../../../common/errors-handler/errors-handler";

interface UploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: [];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
  api_key: string;
}

export const uploadImageThunk = createAsyncThunk<
  void,
  File,
  {
    rejectValue: string;
  }
>("profile/uploadImage", async (file, { dispatch, rejectWithValue }) => {
  try {
    dispatch(isLoading({ setPreloading: true }));

    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post<UploadResponse>(
      `${import.meta.env.VITE_API_URL}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const id = localStorage.getItem("id");
    const img = await axiosInstance.patch(
      `${import.meta.env.VITE_API_URL}/profile/${id}`,
      { image: res.data.url }
    );

    dispatch(updatePhoto({ photoUrl: img.data }));
  } catch (err: any) {
    handleAxiosError(err, rejectWithValue);
  } finally {
    dispatch(isLoading({ setPreloading: false }));
  }
});
