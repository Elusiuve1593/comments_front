import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Comment {
  id: number | null;
  text: string;
  parentId: number | null;
  createdAt: string;
}

export interface ProfileInterface {
  username: string;
  avatar: string;
  email: string;
  password: string;
  comments: Comment[];
  replies: Comment[];
}

const initialState: ProfileInterface = {
  username: "",
  avatar: "",
  email: "",
  password: "",
  comments: [
    {
      id: null,
      text: "",
      parentId: null,
      createdAt: "",
    },
  ],
  replies: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updatePhoto(state, action: PayloadAction<{ photoUrl: string }>) {
      state.avatar = action.payload.photoUrl;
    },
    setUser(_, action: PayloadAction<{ user: ProfileInterface }>) {
      return action.payload.user;
    },
    addComment(state, action: PayloadAction<{ data: Comment }>) {
      state.comments.push(action.payload.data);
    },
    editComment(state, action: PayloadAction<{ data: Comment }>) {
      state.comments = state.comments.map((el: Comment) =>
        el.id === action.payload.data.id
          ? { ...el, ...action.payload.data }
          : el
      );
    },
    deleteComment(state, action: PayloadAction<{ id: number }>) {
      state.comments = state.comments.filter(
        (el) => el.id !== action.payload.id
      );
    },
    fetchComment(state, action: PayloadAction<{ data: Comment[] }>) {
      state.comments = action.payload.data;
    },
  },
});

export const {
  updatePhoto,
  setUser,
  addComment,
  editComment,
  deleteComment,
  fetchComment,
} = profileSlice.actions;
export default profileSlice.reducer;
