import { api } from "services";
import { convertAsyncError, createAppAsyncThunk } from "utils";

import type { ITaskPriority } from "types";

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
