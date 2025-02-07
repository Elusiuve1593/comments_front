import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "../../../../common/errors-handler/errors-handler";
import { SignUpFormInterface } from "../../../../components/auth/registration/SignUp";
import axiosInstance from "../../../axios-interceptor";
import { isLoading } from "../../preloader/slice";

interface SignUpInfo {
  message: string;
}

export const signUpThunk = createAsyncThunk<
  void,
  SignUpFormInterface,
  {
    rejectValue: string;
  }
>("signUp/signUpThunk", async (param, { dispatch, rejectWithValue }) => {
  try {
    dispatch(isLoading({ setPreloading: true }));

    await axiosInstance.post<SignUpInfo>(
      `${import.meta.env.VITE_API_URL}/auth/sign-up`,
      param
    );
  } catch (err: any) {
    return handleAxiosError(err, rejectWithValue);
  } finally {
    dispatch(isLoading({ setPreloading: false }));
  }
});
