import React, { useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material";

import { themes } from "./theme";
import { ThemeContext } from "./useThemeContext";
import type { IThemeMode } from "./theme";

export const ThemeContextProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<IThemeMode>("dark");

  const currentTheme = useMemo(() => themes[themeMode], [themeMode]);

  const switchTheme = (themeMode: IThemeMode) => setThemeMode(themeMode);

  return (
    <ThemeContext.Provider
      value={{ mode: themeMode, currentTheme, switchTheme }}
    >
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
