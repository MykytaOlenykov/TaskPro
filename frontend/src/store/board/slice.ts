import { createSlice } from "@reduxjs/toolkit";

import { createBoard, getBoards } from "./operations";

import type { IBoard } from "types";

export interface IInitialState {
  items: IBoard[];
}

const initialState: IInitialState = {
  items: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const boardReducer = boardSlice.reducer;
