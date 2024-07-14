import { api } from "services";
import { convertAsyncError, createAppAsyncThunk } from "utils";

import type { ITask, ITaskPriority } from "types";

export const getTaskPriorities = createAppAsyncThunk<ITaskPriority[], void>(
  "tasks/getTaskPriorities",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ITaskPriority[]>("tasks/priorities");
      return data;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);

export const createTask = createAppAsyncThunk<ITask, Omit<ITask, "_id">>(
  "tasks/createTask",
  async (data, { rejectWithValue }) => {
    try {
      const { data: newData } = await api.post<ITask>("tasks", data);
      return newData;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);
