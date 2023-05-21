import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface UserState {
  user: {
    name: string;
  };
}

const initialState: UserState = {
  user: {
    name: "Ryan",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.user.name = action.payload;
    },
  },
});

export const { setName } = userSlice.actions;

export const selectUser = (state: RootState) => state.users.user.name;

export default userSlice.reducer;
