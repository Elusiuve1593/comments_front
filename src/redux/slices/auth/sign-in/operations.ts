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
  access_token: string;
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
    localStorage.setItem("id", res.data.id.toString());
    toast.success("Login is successfully!", { style });
    dispatch(enableAccess({ access_token: res.data.access_token }));
  } catch (err: any) {
    return handleAxiosError(err, rejectWithValue);
  } finally {
    dispatch(isLoading({ setPreloading: false }));
  }
});
