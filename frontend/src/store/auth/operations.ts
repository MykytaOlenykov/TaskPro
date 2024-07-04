import { api } from "services";
import { createAppAsyncThunk } from "utils/createAppAsyncThunk";
import { token } from "utils/token";
import { IUser } from "types/IUser";

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

export const refreshUser = createAppAsyncThunk<NonNullable<IUser>, void>(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ accessToken: string }>("users/refresh");
      token.save(data.accessToken);
      const { data: user } = await api.get<NonNullable<IUser>>("users/current");
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
