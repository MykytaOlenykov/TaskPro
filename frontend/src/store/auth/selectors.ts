import { RootState } from "store/store";

export const selectTheme = (state: RootState) => state.auth.user.theme;
