import { createSlice } from "@reduxjs/toolkit";

import { createColumn, deleteColumn, editColumn } from "./operations";
import { deleteBoard, getBoard } from "store/boards/operations";
import { logOut } from "store/auth/operations";

import type { IColumn } from "types";

export interface IInitialState {
  items: IColumn[];
}

const initialState: IInitialState = {
  items: [],
};

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createColumn.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editColumn.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          ({ _id }) => _id === action.payload._id
        );
        idx !== -1 && state.items.splice(idx, 1, action.payload);
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.items = state.items.filter(({ _id }) => _id !== action.payload);
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.items = action.payload.columns;
      })
      .addCase(getBoard.pending, (state) => {
        state.items = [];
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const columnsReducer = columnsSlice.reducer;
