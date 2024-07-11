import type { RootState } from "store";

export const selectColumns = (state: RootState) => state.columns.items;
