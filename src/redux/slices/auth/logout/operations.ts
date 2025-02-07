import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../../../common/errors-handler/errors-handler";
import { style } from "../../../../common/styles/styles";
import axiosInstance from "../../../axios-interceptor";
import { isLoading } from "../../preloader/slice";
import { disableAccess } from "../authentication/slice";

interface LogoutInfo {
  message: string;
}

export const logoutThunk = createAsyncThunk(
  "logout/logoutThunk",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading({ setPreloading: true }));
      const res = await axiosInstance.get<LogoutInfo>(
        `${import.meta.env.VITE_API_URL}/auth/logout`
      );
      toast.success(res.data.message, { style });
      dispatch(disableAccess({ logout: !true }));
    } catch (err: any) {
      return handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);
