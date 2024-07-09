import { api } from "services";
import { convertAsyncError, createAppAsyncThunk } from "utils";

import type { IIcon, IBackground } from "types";

export const getIcons = createAppAsyncThunk<IIcon[], void>(
  "static/getIcons",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<IIcon[]>("icons");
      return data;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);

export const getBackgrounds = createAppAsyncThunk<IBackground[], void>(
  "static/getBackgrounds",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<IBackground[]>("backgrounds");
      return data;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);
