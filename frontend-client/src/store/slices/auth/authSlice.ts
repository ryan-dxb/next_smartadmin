import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { IUser } from "../api/types";

interface AuthState {
  user: IUser | {};
  token: string;
}

const initialState: AuthState = {
  user: {},
  token: "",
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: () => initialState,
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.users;

export default authSlice.reducer;
