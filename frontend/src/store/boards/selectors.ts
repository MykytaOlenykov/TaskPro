import type { RootState } from "store";

export const selectBoards = (state: RootState) => state.boards.items;
export const selectLoadingBoard = (state: RootState) =>
  state.boards.loadingBoard;
export const selectBoardNotFound = (state: RootState) =>
  state.boards.boardNotFound;
