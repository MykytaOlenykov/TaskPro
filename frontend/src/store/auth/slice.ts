import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getCurrentUser } from "./operations";

import type { IThemeMode } from "theme";
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
  reducers: {
    changeTheme(state, action: PayloadAction<{ theme: IThemeMode }>) {
      state.user.theme = action.payload.theme;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const { changeTheme } = authSlice.actions;

export const authReducer = authSlice.reducer;
