import { createContext, useContext } from "react";
import { Theme } from "@mui/material";

import { themes } from "./theme";

export type IThemeMode = keyof typeof themes;

interface IThemeContextProps {
  mode: IThemeMode;
  currentTheme: Theme;
  switchTheme: (mode: IThemeMode) => void;
}

export const ThemeContext = createContext<IThemeContextProps | undefined>(
  undefined
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};
