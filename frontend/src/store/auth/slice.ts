import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getCurrentUser } from "./operations";

import type { IThemeMode } from "theme";
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
  refreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<{ theme: IThemeMode }>) {
      state.user.theme = action.payload.theme;
    },
  },
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
      });
  },
});

export const { changeTheme } = authSlice.actions;

export const authReducer = authSlice.reducer;
