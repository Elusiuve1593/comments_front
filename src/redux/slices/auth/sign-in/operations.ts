import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../../../common/errors-handler/errors-handler";
import { style } from "../../../../common/styles/styles";
import axiosInstance from "../../../axios-interceptor";
import { isLoading } from "../../preloader/slice";
import { enableAccess } from "../authentication/slice";

interface TokenInfo {
  id: number;
  token: string;
}

export const loginThunk = createAsyncThunk<any, any>("login/loginThunk", async (param, { dispatch, rejectWithValue }) => {
  try {
    dispatch(isLoading({ setPreloading: true }));
    const res = await axiosInstance.post<TokenInfo>(
      `${import.meta.env.VITE_API_URL}/auth/sign-in`,
      param
    );
    toast.success("Login is successfully!", { style });
    dispatch(enableAccess({ token: res.data.token }));
  } catch (err: any) {
    return handleAxiosError(err, rejectWithValue);
  } finally {
    dispatch(isLoading({ setPreloading: false }));
  }
});
