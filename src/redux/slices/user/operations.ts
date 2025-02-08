import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios-interceptor";
import {
  addComment,
  Comment,
  deleteComment,
  editComment,
  fetchComment,
  ProfileInterface,
  setUser,
} from "./slice";
import { isLoading } from "../preloader/slice";
import { handleAxiosError } from "../../../common/errors-handler/errors-handler";

export const fetchCommentsThunk = createAsyncThunk(
  "profile/fetchComments",
  async (
    { page, limit }: { page: number; limit: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.get<Comment[]>(
        `${import.meta.env.VITE_API_URL}/comments?page=${page}&limit=${limit}`
      );

      dispatch(fetchComment({ data: res.data }));
      return res;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const fetchProfileThunk = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<ProfileInterface>(
        `${import.meta.env.VITE_API_URL}/auth/user`
      );
      dispatch(setUser({ user: res.data }));
    } catch (err) {
      console.error(err, rejectWithValue);
    }
  }
);

export const commentThunk = createAsyncThunk<void, { text: string }>(
  "profile/addComment",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading({ setPreloading: true }));

      const res = await axiosInstance.post<Comment>(
        `${import.meta.env.VITE_API_URL}/comments`,
        data
      );

      dispatch(addComment({ data: res.data }));
    } catch (err: any) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const editCommentThunk = createAsyncThunk<void, any>(
  "profile/editComment",
  async (data: { id: number; text: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading({ setPreloading: true }));

      const res = await axiosInstance.put<Comment>(
        `${import.meta.env.VITE_API_URL}/comments/${data.id}`,
        { text: data.text }
      );

      dispatch(editComment({ data: res.data }));
    } catch (err: any) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);

export const deleteCommentThunk = createAsyncThunk(
  "profile/deleteComment",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/comments/${id}`);
      dispatch(deleteComment({ id }));
    } catch (err) {
      handleAxiosError(err, rejectWithValue);
    } finally {
      dispatch(isLoading({ setPreloading: false }));
    }
  }
);
