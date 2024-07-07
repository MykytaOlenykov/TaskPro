import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBorder {
    input?: string;
    popup?: string;
  }

  interface TypeIcon {
    avatarPlaceholder?: string;
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
    popup?: string;
  }

  interface TypeBackground {
    primaryBox?: string;
    primaryInput?: string;
    primaryButton?: string;
    primaryButtonHover?: string;
    header?: string;
    modal?: string;
  }
}
