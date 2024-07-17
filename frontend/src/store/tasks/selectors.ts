import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "store";

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTaskPriorities = (state: RootState) =>
  state.tasks.priorities;
export const selectTasksFilter = (state: RootState) => state.tasks.filter;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectTasksFilter],
  (tasks, filter) =>
    filter === null
      ? tasks
      : tasks.filter(({ priority_id }) => priority_id === filter)
);
