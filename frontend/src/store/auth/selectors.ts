import type { RootState } from "store";

export const selectTheme = (state: RootState) => state.auth.user.theme;
