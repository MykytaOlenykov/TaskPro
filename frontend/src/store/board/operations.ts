import { api } from "services";
import { convertAsyncError, createAppAsyncThunk } from "utils";

import type { IBoard } from "types";

export const getBoards = createAppAsyncThunk<IBoard[], void>(
  "board/getBoards",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("boards");
      return data;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);

export const createBoard = createAppAsyncThunk<IBoard, Omit<IBoard, "_id">>(
  "board/createBoard",
  async (data, { rejectWithValue }) => {
    try {
      const { data: newData } = await api.post("boards", data);
      return newData;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);
