import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { handleAxiosError } from "../../../common/errors-handler/errors-handler";
import axiosInstance from "../../axios-interceptor";
import { RootState } from "../../store";
import { isLoading } from "../preloader/slice";
import { ProfileInterface, profile, updateProfile } from "./slice";

export const profileThunk = createAsyncThunk(
  "profile/profileThunk",
  async (id: number | null, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      const res = await axiosInstance.get<ProfileInterface>(
        `${import.meta.env.VITE_API_URL}/profile/${id}`
      );
      dispatch(profile({ profile: res.data }));
    } catch (err: any) {
      handleAxiosError(err, rejectWithValue, "/");
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  "updateProfile/updateProfileThunk",
  async (
    params: { id: number | null; profile: ProfileInterface },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      const {
        phone_number,
        first_name,
        last_name,
        nick_name,
        description,
        position,
      } = params.profile;

      const res = await axiosInstance.put<ProfileInterface>(
        `${import.meta.env.VITE_API_URL}/profile/${params.id}`,
        {
          phone_number,
          first_name,
          last_name,
          nick_name,
          description,
          position,
        }
      );

      const img = useSelector((state: RootState) => state.profile.image);
      const data = {
        ...res.data,
        image: img,
      };

      dispatch(updateProfile({ updateProfile: data }));
    } catch (err: any) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);
