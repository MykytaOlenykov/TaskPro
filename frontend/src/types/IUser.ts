import type { IThemeMode } from "theme";

export interface IUser {
  name: string | null;
  email: string | null;
  theme: IThemeMode;
}
