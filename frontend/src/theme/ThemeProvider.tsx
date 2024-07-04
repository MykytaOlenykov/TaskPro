import React, { useMemo } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";

import { selectTheme } from "store/auth/selectors";
import { useAppSelector } from "hooks/useAppSelector";
import { themes } from "./theme";

const defaultTheme = createTheme();

export const ThemeProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const themeMode = useAppSelector(selectTheme);

  const currentTheme = useMemo(
    () => themes[themeMode] || defaultTheme,
    [themeMode]
  );

  return <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>;
};
