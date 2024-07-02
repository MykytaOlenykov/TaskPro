import { Container as MuiContainer, styled } from "@mui/material";

export const Container = styled(MuiContainer)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#F6F6F7",
  backgroundImage:
    "linear-gradient(180deg, rgba(196, 196, 196, 0) 25%, #bedbb0 92.19%)",

  [theme.breakpoints.up("xs")]: {
    padding: 20,
    maxWidth: "100%",
  },
}));
