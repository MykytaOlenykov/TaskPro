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
      md: 758,
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
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "14px 8px",
          width: "100%",
          fontWeight: 500,
          fontSize: 14,
          lineHeight: 1.5,
          letterSpacing: "-0.02em",
          textTransform: "none",
          borderRadius: 8,
        },
      },
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
    text: {},
    background: {},
  },
});

const darkTheme = createTheme({
  ...base,
  palette: {
    ...base.palette,
    mode: "dark",
    text: {},
    background: {},
  },
});

const violetTheme = createTheme({
  ...base,
  palette: {
    ...base.palette,
    mode: "light",
    text: {},
    background: {},
  },
});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  violet: violetTheme,
};
