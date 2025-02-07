import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../../../common/errors-handler/errors-handler";
import { style } from "../../../../common/styles/styles";
import { LoginFormInterface } from "../../../../components/auth/login/Login";
import { isLoading } from "../../preloader/slice";
import { enableAccess } from "../authentication/slice";
import axiosInstance from "../../../axios-interceptor";

interface TokenInfo {
  id: number;
  token: string;
}

export const loginThunk = createAsyncThunk<
  void,
  LoginFormInterface,
  {
    rejectValue: string;
  }
>("login/loginThunk", async (param, { dispatch, rejectWithValue }) => {
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
