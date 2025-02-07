import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  access_token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("access_token") ? true : false,
  access_token: localStorage.getItem("access_token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    enableAccess(state, action: PayloadAction<{ access_token: string }>) {
      state.isAuthenticated = true;
      state.access_token = action.payload.access_token;
      localStorage.setItem("access_token", action.payload.access_token);
    },
    disableAccess(state, action: PayloadAction<{ logout: boolean }>) {
      state.isAuthenticated = action.payload.logout;
      state.access_token = null;
      localStorage.removeItem("access_token");
    },
  },
});

export const { enableAccess, disableAccess } = authSlice.actions;
export default authSlice.reducer;