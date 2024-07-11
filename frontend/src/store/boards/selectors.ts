import type { RootState } from "store";

export const selectBoards = (state: RootState) => state.boards.items;
export const selectLoading = (state: RootState) => state.boards.loading;
