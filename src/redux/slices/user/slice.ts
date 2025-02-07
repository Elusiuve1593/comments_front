import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ProfileInterface {
  username: string,
  avatar: string,
  email: string,
  password: string,
}

const initialState: ProfileInterface = {
  username: "",
  avatar: "",
  email: "",
  password: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updatePhoto(state, action: PayloadAction<{ photoUrl: string }>) {
      state.avatar = action.payload.photoUrl;
    },
  },
});

export const { updatePhoto } = profileSlice.actions;
export default profileSlice.reducer;
