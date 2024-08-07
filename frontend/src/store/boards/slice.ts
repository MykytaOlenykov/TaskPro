import { createSlice } from "@reduxjs/toolkit";

import {
  createBoard,
  deleteBoard,
  editBoard,
  getBoard,
  getBoards,
} from "./operations";
import { logOut } from "store/auth/operations";

import type { IBoard } from "types";

export interface IInitialState {
  items: IBoard[];
  loadingBoard: boolean;
  boardNotFound: boolean;
}

const initialState: IInitialState = {
  items: [],
  loadingBoard: false,
  boardNotFound: false,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        const { board } = action.payload;
        const idx = state.items.findIndex(({ _id }) => _id === board._id);
        idx !== -1 && state.items.splice(idx, 1, board);
        state.loadingBoard = false;
      })
      .addCase(getBoard.pending, (state) => {
        state.loadingBoard = true;
        state.boardNotFound = false;
      })
      .addCase(getBoard.rejected, (state, action) => {
        if (action.payload?.statusCode !== "ERR_CANCELED") {
          state.loadingBoard = false;
          state.boardNotFound = true;
        }
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          ({ _id }) => _id === action.payload._id
        );
        idx !== -1 && state.items.splice(idx, 1, action.payload);
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.items = state.items.filter(({ _id }) => _id !== action.payload);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loadingBoard = false;
        state.boardNotFound = false;
      });
  },
});

export const boardsReducer = boardsSlice.reducer;
