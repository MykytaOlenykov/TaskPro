import { createSlice } from "@reduxjs/toolkit";

import { deleteBoard, getBoard } from "store/boards/operations";
import { deleteColumn } from "store/columns/operations";
import { logOut } from "store/auth/operations";

import type { ITask } from "types";

export interface IInitialState {
  items: ITask[];
}

const initialState: IInitialState = {
  items: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoard.fulfilled, (state, action) => {
        state.items = action.payload.tasks;
      })
      .addCase(getBoard.pending, (state) => {
        state.items = [];
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.items = state.items.filter(
          ({ column_id }) => column_id !== action.payload
        );
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
