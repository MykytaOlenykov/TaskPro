import { api } from "services";
import { convertAsyncError, createAppAsyncThunk } from "utils";

import type { IColumn } from "types";

export const createColumn = createAppAsyncThunk<IColumn, Omit<IColumn, "_id">>(
  "columns/createColumn",
  async (data, { rejectWithValue }) => {
    try {
      const { data: newData } = await api.post("columns", data);
      return newData;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);

export const editColumn = createAppAsyncThunk<
  IColumn,
  Omit<IColumn, "board_id">
>("columns/editColumn", async (data, { rejectWithValue }) => {
  try {
    const { _id, ...otherData } = data;
    const { data: newData } = await api.put(`columns/${_id}`, otherData);
    return newData;
  } catch (error) {
    return rejectWithValue(convertAsyncError(error));
  }
});

export const deleteColumn = createAppAsyncThunk<string, string>(
  "columns/deleteColumn",
  async (_id, { rejectWithValue }) => {
    try {
      await api.delete(`columns/${_id}`);
      return _id;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);
