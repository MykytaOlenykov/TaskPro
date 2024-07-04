import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    border?: {
      input?: string;
    };
  }

  interface PaletteOptions {
    border?: {
      input?: string;
    };
  }

  interface TypeText {
    primaryButton?: string;
  }

  interface TypeBackground {
    primaryBox?: string;
    primaryInput?: string;
    primaryButton?: string;
    primaryButtonHover?: string;
  }
}
