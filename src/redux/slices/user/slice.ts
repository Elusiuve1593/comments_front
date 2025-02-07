import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CompaniesInterface } from "../companies/slice";

export interface ProfileInterface {
  id?: number | undefined;
  image?: string | null;
  email?: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  nick_name: string;
  description: string;
  position: string;
  roles?: string[];
  companies?: CompaniesInterface[];
}

const initialState: ProfileInterface = {
  image: "",
  email: "",
  phone_number: "",
  first_name: "",
  last_name: "",
  nick_name: "",
  description: "",
  position: "",
  roles: [""],
  companies: [
    {
      name: "",
      address: "",
      service_of_activity: "",
      number_of_employees: 0,
      description: "",
      type: "",
    },
  ],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profile(_, action: PayloadAction<{ profile: ProfileInterface }>) {
      return action.payload.profile;
    },
    updatePhoto(state, action: PayloadAction<{ photoUrl: string }>) {
      state.image = action.payload.photoUrl;
    },
    updateProfile(
      _,
      action: PayloadAction<{ updateProfile: ProfileInterface }>
    ) {
      return action.payload.updateProfile;
    },
  },
});

export const { profile, updatePhoto, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
