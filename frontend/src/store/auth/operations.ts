import { api } from "services";
import { convertAsyncError, createAppAsyncThunk } from "utils";

import type { IUser } from "types";

export const register = createAppAsyncThunk<
  Pick<IUser, "name" | "email">,
  Pick<IUser, "name" | "email"> & { password: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post<Pick<IUser, "name" | "email">>(
      "users/register",
      credentials
    );
    return data;
  } catch (error) {
    return rejectWithValue(convertAsyncError(error));
  }
});

export const logIn = createAppAsyncThunk<void, void>(
  "auth/logIn",
  async () => {}
);

export const logOut = createAppAsyncThunk<void, void>(
  "auth/logOut",
  async () => {}
);

export const getCurrentUser = createAppAsyncThunk<NonNullable<IUser>, void>(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data: user } = await api.get<NonNullable<IUser>>("users/current");
      return user;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);
