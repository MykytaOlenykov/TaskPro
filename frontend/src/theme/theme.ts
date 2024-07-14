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
      secondary: "rgba(22, 22, 22, 0.7)",
      primaryAccent: "#BEDBB0",
      primaryButton: "#161616",
      primaryHeader: "rgba(22, 22, 22, 0.8)",
      primarySideBar: "#161616",
      secondarySideBar: "rgba(22, 22, 22, 0.5)",
      primaryFilter: "rgba(22, 22, 22, 0.8)",
      popup: "#161616",
      light: "rgba(22, 22, 22, 0.5)",
      logo: "#161616",
      label: "rgba(22, 22, 22, 0.5)",
      primaryDatepicker: "rgba(22, 22, 22, 0.5)",
      secondaryDatepicker: "rgba(22, 22, 22, 0.2)",
      selectedDatepicker: "#161616",
    },
    background: {
      default: "#F6F6F7",
      primaryBox: "#FCFCFC",
      primaryInput: "transparent",
      primaryButton: "#BEDBB0",
      primaryButtonHover: "#9DC888",
      secondaryButton: "#FFFFFF",
      secondaryButtonHover: "#FFFFFF",
      primarySideBar: "#FFFFFF",
      secondarySideBar: "#F6F6F7",
      primaryLoader: "#BEDBB0",
      primaryAdd: "#161616",
      secondaryAdd: "#161616",
      secondaryLoader: "rgba(190, 219, 176, 0.35)",
      header: "#FCFCFC",
      logo: "#1F1F1F",
      backdrop: "rgba(21, 21, 21, 0.3)",
      sideBarLine: "rgba(22, 22, 22, 0.1)",
      primarySelectedBoard: "#F6F6F7",
      secondarySelectedBoard: "#BEDBB0",
      mainHeader: "rgba(255, 255, 255, 0.4)",
      scrollThumb: "#E8E8E8",
      scrollBar: "#FFFFFF",
      task: "#FFFFFF",
      popup: "#FFFFFF",
    },
    border: {
      input: "#BEDBB0",
      popup: "#BEDBB0",
      datepicker: "rgba(22, 22, 22, 0.2)",
    },
    icon: {
      primary: "rgba(22, 22, 22, 0.5)",
      avatarPlaceholder: "#FFFFFF",
      logo: "#FFFFFF",
      logOut: "#BEDBB0",
      hoverLogOut: "#9DC888",
      primaryAdd: "#FFFFFF",
      task: "rgba(22, 22, 22, 0.5)",
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
      secondary: "rgba(255, 255, 255, 0.5)",
      primaryAccent: "#BEDBB0",
      primaryButton: "#161616",
      primaryHeader: "rgba(255, 255, 255, 0.8)",
      primarySideBar: "#FFFFFF",
      secondarySideBar: "rgba(255, 255, 255, 0.5)",
      primaryFilter: "rgba(255, 255, 255, 0.8)",
      popup: "rgba(255, 255, 255, 0.5)",
      light: "rgba(255, 255, 255, 0.5)",
      logo: "#FFFFFF",
      label: "rgba(255, 255, 255, 0.5)",
      primaryDatepicker: "rgba(255, 255, 255, 0.5)",
      secondaryDatepicker: "rgba(255, 255, 255, 0.2)",
      selectedDatepicker: "#1F1F1F",
    },
    background: {
      default: "#1F1F1F",
      primaryBox: "#151515",
      primaryInput: "#1F1F1F",
      primaryButton: "#BEDBB0",
      primaryButtonHover: "#9DC888",
      secondaryButton: "#121212",
      secondaryButtonHover: "#121212",
      primarySideBar: "#121212",
      secondarySideBar: "#1F1F1F",
      primaryLoader: "#BEDBB0",
      primaryAdd: "#161616",
      secondaryAdd: "#FFFFFF",
      secondaryLoader: "rgba(190, 219, 176, 0.35)",
      header: "#161616",
      logo: "#1F1F1F",
      backdrop: "rgba(21, 21, 21, 0.5)",
      sideBarLine: "rgba(255, 255, 255, 0.1)",
      primarySelectedBoard: "#1F1F1F",
      secondarySelectedBoard: "#BEDBB0",
      mainHeader: "rgba(21, 21, 21, 0.5)",
      scrollThumb: "rgba(255, 255, 255, 0.1)",
      scrollBar: "#161616",
      task: "#121212",
      popup: "#1F1F1F",
    },
    border: {
      input: "#BEDBB0",
      popup: "#BEDBB0",
      modal: "rgba(190, 219, 176, 0.5)",
      datepicker: "rgba(255, 255, 255, 0.2)",
    },
    icon: {
      primary: "rgba(255, 255, 255, 0.5)",
      avatarPlaceholder: "#151515",
      logo: "#FFFFFF",
      logOut: "#BEDBB0",
      hoverLogOut: "#9DC888",
      primaryAdd: "#FFFFFF",
      task: "rgba(255, 255, 255, 0.5)",
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
      secondary: "rgba(22, 22, 22, 0.7)",
      primaryAccent: "#5255BC",
      primaryButton: "#FFFFFF",
      primaryHeader: "rgba(22, 22, 22, 0.8)",
      primarySideBar: "#FFFFFF",
      secondarySideBar: "rgba(255, 255, 255, 0.5)",
      primaryFilter: "rgba(22, 22, 22, 0.8)",
      popup: "#161616",
      light: "rgba(255, 255, 255, 0.5)",
      logo: "#FFFFFF",
      label: "rgba(22, 22, 22, 0.5)",
      primaryDatepicker: "rgba(22, 22, 22, 0.5)",
      secondaryDatepicker: "rgba(22, 22, 22, 0.2)",
      selectedDatepicker: "#FCFCFC",
    },
    background: {
      default: "#ECEDFD",
      primaryBox: "#FCFCFC",
      primaryInput: "transparent",
      primaryButton: "#5255BC",
      primaryButtonHover: "#7B7EDE",
      secondaryButton: "#FFFFFF",
      secondaryButtonHover: "#FFFFFF",
      primarySideBar: "#5255BC",
      secondarySideBar: "rgba(236, 237, 253, 0.4)",
      sideBarButton: "#B8BCFD",
      primaryLoader: "#5255BC",
      secondaryLoader: "rgba(123, 126, 222, 0.35)",
      header: "#FCFCFC",
      logo: "#ECEDFD",
      backdrop: "rgba(21, 21, 21, 0.3)",
      sideBarLine: "rgba(255, 255, 255, 0.1)",
      primaryAdd: "#FFFFFF",
      secondaryAdd: "#5255BC",
      primarySelectedBoard: "rgba(255, 255, 255, 0.2)",
      secondarySelectedBoard: "#FFFFFF",
      mainHeader: "rgba(255, 255, 255, 0.4)",
      scrollBar: "#FFFFFF",
      scrollThumb: "#B8BCFD",
      task: "#FFFFFF",
      popup: "#FFFFFF",
    },
    border: {
      input: "#5255BC",
      popup: "#ECEDFD",
      datepicker: "rgba(22, 22, 22, 0.2)",
    },
    icon: {
      primary: "rgba(22, 22, 22, 0.5)",
      avatarPlaceholder: "#FFFFFF",
      logo: "#5255BC",
      logOut: "#FFFFFF",
      hoverLogOut: "#B8BCFD",
      primaryAdd: "#161616",
      task: "rgba(22, 22, 22, 0.5)",
    },
  },
});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  violet: violetTheme,
};

export type IThemeMode = keyof typeof themes;
