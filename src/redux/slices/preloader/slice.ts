import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false as boolean,
};

const preloaderSlice = createSlice({
  name: "preloader",
  initialState,
  reducers: {
    isLoading(state, action: PayloadAction<{ setPreloading: boolean }>) {
      state.isLoading = action.payload.setPreloading;
    },
  },
});

export const { isLoading } = preloaderSlice.actions;
export default preloaderSlice.reducer;
