import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBorder {
    input?: string;
    popup?: string;
    modal?: string;
  }

  interface TypeIcon {
    primary?: string;
    avatarPlaceholder?: string;
    logo?: string;
    logOut?: string;
    hoverLogOut?: string;
    primaryAdd?: string;
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
    secondarySideBar?: string;
    primaryFilter?: string;
    popup?: string;
    light?: string;
    logo?: string;
  }

  interface TypeBackground {
    primaryBox?: string;
    primaryInput?: string;
    primaryButton?: string;
    primaryButtonHover?: string;
    secondaryButton?: string;
    secondaryButtonHover?: string;
    primarySideBar?: string;
    secondarySideBar?: string;
    sideBarButton?: string;
    primaryLoader?: string;
    secondaryLoader?: string;
    header?: string;
    logo?: string;
    backdrop?: string;
    sideBarLine?: string;
    primaryAdd?: string;
    secondaryAdd?: string;
    primarySelectedBoard?: string;
    secondarySelectedBoard?: string;
    mainHeader?: string;
    scrollBar?: string;
    scrollThumb?: string;
  }
}
