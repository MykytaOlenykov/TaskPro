import type { RootState } from "store";

export const selectBoards = (state: RootState) => state.boards.items;
