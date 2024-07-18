import type { RootState } from "store";

export const selectTheme = (state: RootState) => state.auth.user.theme;
export const selectRefreshing = (state: RootState) => state.auth.refreshing;
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectUserName = (state: RootState) => state.auth.user.name;
export const selectUserEmail = (state: RootState) => state.auth.user.email;
export const selectUserAvatarUrl = (state: RootState) =>
  state.auth.user.avatarUrl;
