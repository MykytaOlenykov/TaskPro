import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBorder {
    input?: string;
    popup?: string;
    modal?: string;
  }

  interface TypeIcon {
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
    primarySideBar?: string;
    secondarySideBar?: string;
    popup?: string;
    light?: string;
    logo?: string;
    selectedDatepicker?: string;
  }

  interface TypeBackground {
    primary?: string;
    primaryBox?: string;
    primaryInput?: string;
    primaryButton?: string;
    primaryButtonHover?: string;
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
    popup?: string;
  }
}
