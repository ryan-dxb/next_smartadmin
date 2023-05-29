import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface UserState {
  user: {};
  token: string;
}

const initialState: UserState = {
  user: {},
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setCredentials } = userSlice.actions;

export const selectUser = (state: RootState) => state.users;

export default userSlice.reducer;
