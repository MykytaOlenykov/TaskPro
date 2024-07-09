import { createSlice } from "@reduxjs/toolkit";

import {
  getCurrentUser,
  logIn,
  register,
  changeTheme,
  logOut,
} from "./operations";

import type { IUser } from "types";

export interface IInitialState {
  user: IUser;
  loggedIn: boolean;
  refreshing: boolean;
}

const initialState: IInitialState = {
  user: {
    name: null,
    email: null,
    theme: "dark",
  },
  loggedIn: false,
  refreshing: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
        state.refreshing = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.refreshing = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.refreshing = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(changeTheme.fulfilled, (state, action) => {
        state.user.theme = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.loggedIn = initialState.loggedIn;
      });
  },
});

export const authReducer = authSlice.reducer;
