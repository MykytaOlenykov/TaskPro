import { createSlice } from "@reduxjs/toolkit";

import { createBoard, editBoard, getBoards } from "./operations";

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
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          ({ _id }) => _id === action.payload._id
        );
        idx !== -1 && state.items.splice(idx, 1, action.payload);
      });
  },
});

export const boardReducer = boardSlice.reducer;
