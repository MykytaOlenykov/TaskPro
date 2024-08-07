import { api } from "services";
import { convertAsyncError, createAppAsyncThunk, token } from "utils";
import { getBackgrounds, getIcons } from "store/static/operations";
import { getTaskPriorities } from "store/tasks/operations";

import type { IThemeMode } from "theme";
import type { IUser } from "types";

export const register = createAppAsyncThunk<
  NonNullable<Pick<IUser, "name" | "email">>,
  NonNullable<Pick<IUser, "name" | "email">> & { password: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post<NonNullable<Pick<IUser, "name" | "email">>>(
      "users/register",
      credentials
    );

    return data;
  } catch (error) {
    const asyncError = convertAsyncError(error);
    return rejectWithValue({
      ...asyncError,
      message:
        asyncError.statusCode === 409
          ? "A user with this email already exists."
          : asyncError.message,
    });
  }
});

export const logIn = createAppAsyncThunk<
  NonNullable<IUser>,
  NonNullable<Pick<IUser, "email">> & { password: string }
>("auth/logIn", async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await api.post<{
      user: NonNullable<IUser>;
      accessToken: string;
    }>("users/login", credentials);

    token.save(data.accessToken);
    await Promise.all([
      dispatch(getIcons()),
      dispatch(getBackgrounds()),
      dispatch(getTaskPriorities()),
    ]);

    return data.user;
  } catch (error) {
    return rejectWithValue(convertAsyncError(error));
  }
});

export const logOut = createAppAsyncThunk<void, void>(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("users/logout");
      token.clear();
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);

export const getCurrentUser = createAppAsyncThunk<NonNullable<IUser>, void>(
  "auth/getCurrentUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data: user } = await api.get<NonNullable<IUser>>("users/current");
      await Promise.all([
        dispatch(getIcons()),
        dispatch(getBackgrounds()),
        dispatch(getTaskPriorities()),
      ]);
      return user;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

export const editUserProfile = createAppAsyncThunk<
  NonNullable<Pick<IUser, "name">>,
  NonNullable<Pick<IUser, "name">>
>("auth/editUserProfile", async (data, { rejectWithValue }) => {
  try {
    const { data: user } = await api.put<NonNullable<IUser>>("users", data);
    return user;
  } catch (error) {
    return rejectWithValue(convertAsyncError(error));
  }
});

export const changeTheme = createAppAsyncThunk<IThemeMode, IThemeMode>(
  "auth/changeTheme",
  async (theme, { rejectWithValue }) => {
    try {
      const { data } = await api.patch<{ theme: IThemeMode }>("users", {
        theme,
      });
      return data.theme;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);

export const changeUserAvatar = createAppAsyncThunk<string, FormData>(
  "auth/changeUserAvatar",
  async (data, { rejectWithValue }) => {
    try {
      const {
        data: { avatarUrl },
      } = await api.patch<{ avatarUrl: string }>("users/avatars", data);
      return avatarUrl;
    } catch (error) {
      return rejectWithValue(convertAsyncError(error));
    }
  }
);

export const sendHelpEmail = createAppAsyncThunk<
  void,
  { email: string; comment: string }
>("auth/sendHelpEmail", async (data, { rejectWithValue }) => {
  try {
    await api.post("users/help", data);
  } catch (error) {
    return rejectWithValue(convertAsyncError(error));
  }
});
