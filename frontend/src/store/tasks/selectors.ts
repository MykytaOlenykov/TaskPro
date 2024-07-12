import type { RootState } from "store";

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTaskPriorities = (state: RootState) =>
  state.tasks.priorities;
