import { createSlice } from "@reduxjs/toolkit";

import { createColumn } from "./operations";
import { deleteBoard, getBoard } from "store/boards/operations";

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
      .addCase(getBoard.fulfilled, (state, action) => {
        state.items = action.payload.columns;
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const columnsReducer = columnsSlice.reducer;
