import { ThemeOptions, createTheme } from "@mui/material";

import RegularPoppinsFont from "assets/fonts/poppins-v21-latin-regular.woff2";
import MediumPoppinsFont from "assets/fonts/poppins-v21-latin-500.woff2";
import SemiBoldPoppinsFont from "assets/fonts/poppins-v21-latin-600.woff2";

const base: ThemeOptions = {
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1440,
      xl: 1440,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-display: swap;
          font-family: "Poppins";
          font-style: normal;
          font-weight: 400;
          src: url(${RegularPoppinsFont}) format("woff2");
        }
        @font-face {
          font-display: swap;
          font-family: "Poppins";
          font-style: normal;
          font-weight: 500;
          src: url(${MediumPoppinsFont}) format("woff2");
        }
        @font-face {
          font-display: swap;
          font-family: "Poppins";
          font-style: normal;
          font-weight: 600;
          src: url(${SemiBoldPoppinsFont}) format("woff2");
        }
      `,
    },
  },
  palette: {
    common: {
      black: "#161616",
    },
  },
};

const lightTheme = createTheme({
  ...base,
  palette: {
    ...base.palette,
    mode: "light",
    text: {
      primary: "#161616",
    },
    background: {
      default: "#F6F6F7",
    },
  },
});

const darkTheme = createTheme({
  ...base,
  palette: {
    ...base.palette,
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      primaryButton: "#161616",
    },
    background: {
      default: "#1F1F1F",
      primaryBox: "#151515",
      primaryInput: "#1F1F1F",
      primaryButton: "#BEDBB0",
      primaryButtonHover: "#9DC888",
    },
    border: {
      input: "#BEDBB0",
    },
  },
});

const violetTheme = createTheme({
  ...base,
  palette: {
    ...base.palette,
    mode: "light",
    text: {
      primary: "#161616",
    },
    background: {
      default: "#ECEDFD",
    },
  },
});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  violet: violetTheme,
};

export type IThemeMode = keyof typeof themes;
