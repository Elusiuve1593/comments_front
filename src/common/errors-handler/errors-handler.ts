import axios, { AxiosError } from "axios";
import { style } from "../styles/styles";
import toast from "react-hot-toast";

export const handleAxiosError = (
  err: any,
  rejectWithValue: any,
  redirection?: string
) => {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<any>;
    if (axiosError.response?.data) {
      toast.error(axiosError.response?.data.message, { style });
      if (redirection && redirection.length > 0) {
        window.location.href = `/${redirection}`;
      }
      return rejectWithValue(axiosError.response.data);
    }
  }
  return rejectWithValue(err.message);
};