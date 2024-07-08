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
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "h2",
          subtitle2: "h3",
          body1: "p",
          body2: "span",
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
    text: {
      primary: "#161616",
      primaryAccent: "#BEDBB0",
      primaryButton: "#161616",
      primaryHeader: "rgba(22, 22, 22, 0.8)",
      primarySideBar: "#161616",
      popup: "#161616",
      light: "rgba(22, 22, 22, 0.5)",
      logo: "#161616",
    },
    background: {
      default: "#F6F6F7",
      primaryButton: "#BEDBB0",
      primaryButtonHover: "#9DC888",
      primarySideBar: "#FFFFFF",
      secondarySideBar: "#F6F6F7",
      header: "#FCFCFC",
      modal: "#FCFCFC",
      logo: "#1F1F1F",
      backdrop: "rgba(21, 21, 21, 0.3)",
      sideBarLine: "rgba(22, 22, 22, 0.1)",
    },
    border: {
      popup: "#BEDBB0",
    },
    icon: {
      avatarPlaceholder: "#FFFFFF",
      logo: "#FFFFFF",
      logOut: "#BEDBB0",
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
      primaryAccent: "#BEDBB0",
      primaryButton: "#161616",
      primaryHeader: "rgba(255, 255, 255, 0.8)",
      primarySideBar: "#FFFFFF",
      popup: "rgba(255, 255, 255, 0.5)",
      light: "rgba(255, 255, 255, 0.5)",
      logo: "#FFFFFF",
    },
    background: {
      default: "#1F1F1F",
      primaryBox: "#151515",
      primaryInput: "#1F1F1F",
      primaryButton: "#BEDBB0",
      primaryButtonHover: "#9DC888",
      primarySideBar: "#121212",
      secondarySideBar: "#1F1F1F",
      header: "#161616",
      modal: "#151515",
      logo: "#1F1F1F",
      backdrop: "rgba(21, 21, 21, 0.5)",
      sideBarLine: "rgba(255, 255, 255, 0.1)",
    },
    border: {
      input: "#BEDBB0",
      popup: "#BEDBB0",
    },
    icon: {
      avatarPlaceholder: "#151515",
      logo: "#FFFFFF",
      logOut: "#BEDBB0",
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
      primaryAccent: "#5255BC",
      primaryButton: "#FFFFFF",
      primaryHeader: "rgba(22, 22, 22, 0.8)",
      primarySideBar: "#FFFFFF",
      popup: "#161616",
      light: "rgba(255, 255, 255, 0.5)",
      logo: "#FFFFFF",
    },
    background: {
      default: "#ECEDFD",
      primaryButton: "#5255BC",
      primaryButtonHover: "#7B7EDE",
      primarySideBar: "#5255BC",
      secondarySideBar: "rgba(236, 237, 253, 0.4)",
      sideBarButton: "#B8BCFD",
      header: "#FCFCFC",
      modal: "#FCFCFC",
      logo: "#ECEDFD",
      backdrop: "rgba(21, 21, 21, 0.3)",
      sideBarLine: "rgba(255, 255, 255, 0.1)",
    },
    border: {
      popup: "#ECEDFD",
    },
    icon: {
      avatarPlaceholder: "#FFFFFF",
      logo: "#5255BC",
      logOut: "#FFFFFF",
    },
  },
});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  violet: violetTheme,
};

export type IThemeMode = keyof typeof themes;
