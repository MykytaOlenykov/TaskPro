import { createSlice } from "@reduxjs/toolkit";

import type { IUser } from "types/IUser";

export interface IInitialState {
  user: IUser;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

const initialState: IInitialState = {
  user: {
    name: null,
    email: null,
    theme: "dark",
  },
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
