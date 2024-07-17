import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { deleteBoard, getBoard } from "store/boards/operations";
import { deleteColumn } from "store/columns/operations";
import {
  changeTaskColumn,
  createTask,
  deleteTask,
  editTask,
  getTaskPriorities,
} from "./operations";
import { logOut } from "store/auth/operations";

import type { ITask, ITaskPriority } from "types";

export interface IInitialState {
  items: ITask[];
  priorities: ITaskPriority[];
  filter: "without" | string | null;
}

const initialState: IInitialState = {
  items: [],
  priorities: [],
  filter: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    changeFilter(state, action: PayloadAction<"without" | string | null>) {
      state.filter = action.payload;
    },
  },
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
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          ({ _id }) => _id === action.payload._id
        );
        idx !== -1 && state.items.splice(idx, 1, action.payload);
      })
      .addCase(changeTaskColumn.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          ({ _id }) => _id === action.payload._id
        );
        idx !== -1 && state.items.splice(idx, 1, action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(({ _id }) => _id !== action.payload);
      })
      .addCase(getTaskPriorities.fulfilled, (state, action) => {
        state.priorities = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.priorities = [];
      });
  },
});

export const { changeFilter } = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
