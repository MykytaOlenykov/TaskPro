import { api } from "services";
import { createAppAsyncThunk } from "utils/createAppAsyncThunk";

import type { IUser } from "types";

export const register = createAppAsyncThunk<void, void>(
  "auth/register",
  async () => {}
);

export const logIn = createAppAsyncThunk<void, void>(
  "auth/logIn",
  async () => {}
);

export const logOut = createAppAsyncThunk<void, void>(
  "auth/logOut",
  async () => {}
);

export const getCurrentUser = createAppAsyncThunk<NonNullable<IUser>, void>(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const { data: user } = await api.get<NonNullable<IUser>>("users/current");
      return user;
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);
