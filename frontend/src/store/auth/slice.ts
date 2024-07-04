import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
});

export const { changeTheme } = authSlice.actions;

export const authReducer = authSlice.reducer;
