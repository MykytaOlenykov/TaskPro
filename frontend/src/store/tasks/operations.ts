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

export const editTask = createAppAsyncThunk<ITask, Omit<ITask, "column_id">>(
  "tasks/editTask",
  async (data, { rejectWithValue }) => {
    try {
      const { _id, ...otherData } = data;
      const { data: newData } = await api.put<ITask>(`tasks/${_id}`, otherData);
      return newData;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);
