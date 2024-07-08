import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBorder {
    input?: string;
    popup?: string;
  }

  interface TypeIcon {
    avatarPlaceholder?: string;
    logo?: string;
    logOut?: string;
  }

  interface Palette {
    border?: TypeBorder;
    icon?: TypeIcon;
  }

  interface PaletteOptions {
    border?: TypeBorder;
    icon?: TypeIcon;
  }

  interface TypeText {
    primaryButton?: string;
    primaryAccent?: string;
    primaryHeader?: string;
    primarySideBar?: string;
    popup?: string;
    light?: string;
  }

  interface TypeBackground {
    primaryBox?: string;
    primaryInput?: string;
    primaryButton?: string;
    primaryButtonHover?: string;
    primarySideBar?: string;
    secondarySideBar?: string;
    sideBarButton?: string;
    header?: string;
    modal?: string;
    logo?: string;
    backdrop?: string;
    sideBarLine?: string;
  }
}
