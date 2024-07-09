import { createSlice } from "@reduxjs/toolkit";

import type { IBackground, IIcon } from "types";
import { getBackgrounds, getIcons } from "./operations";
import { logOut } from "store/auth/operations";

export interface IInitialState {
  icons: IIcon[];
  backgrounds: IBackground[];
}

const initialState: IInitialState = {
  icons: [],
  backgrounds: [],
};

const staticSlice = createSlice({
  name: "static",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIcons.fulfilled, (state, action) => {
        state.icons = action.payload;
      })
      .addCase(getBackgrounds.fulfilled, (state, action) => {
        state.backgrounds = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.icons = [];
        state.backgrounds = [];
      });
  },
});

export const staticReducer = staticSlice.reducer;
