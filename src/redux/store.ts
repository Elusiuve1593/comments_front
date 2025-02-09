import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authentication/slice";
import preloaderSlice from "./slices/preloader/slice";
import profileSlice from "./slices/user/slice";

const reducer = {
  auth: authSlice,
  profile: profileSlice,
  preloader: preloaderSlice,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["profile/fetchComments/fulfilled"],
        ignoredPaths: ["payload.headers"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
export default store;
