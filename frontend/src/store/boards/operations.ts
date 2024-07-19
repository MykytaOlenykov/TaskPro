import { api } from "services";
import { convertAsyncError, createAppAsyncThunk } from "utils";

import type { IBoard, IColumn, ITask } from "types";

export const getBoards = createAppAsyncThunk<IBoard[], void>(
  "boards/getBoards",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("boards");
      return data;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);

export const getBoard = createAppAsyncThunk<
  { board: IBoard; columns: IColumn[]; tasks: ITask[] },
  { _id: string; signal: AbortSignal }
>("boards/getBoard", async ({ _id, signal }, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`boards/${_id}`, { signal });
    return data;
  } catch (error) {
    return rejectWithValue(convertAsyncError(error));
  }
});

export const createBoard = createAppAsyncThunk<IBoard, Omit<IBoard, "_id">>(
  "boards/createBoard",
  async (data, { rejectWithValue }) => {
    try {
      const { data: newData } = await api.post("boards", data);
      return newData;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);

export const editBoard = createAppAsyncThunk<IBoard, IBoard>(
  "boards/editBoard",
  async (data, { rejectWithValue }) => {
    try {
      const { _id, ...otherData } = data;
      const { data: newData } = await api.put(`boards/${_id}`, otherData);
      return newData;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);

export const deleteBoard = createAppAsyncThunk<string, string>(
  "boards/deleteBoard",
  async (_id, { rejectWithValue }) => {
    try {
      await api.delete(`boards/${_id}`);
      return _id;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);
