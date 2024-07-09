import { styled } from "@mui/material";

export const InputLabel = styled("span")(({ theme }) => ({
  display: "block",
  fontWeight: 500,
  fontSize: 14,
  letterSpacing: "-0.02em",
  lineHeight: 1.5,
  color: theme.palette.text.primary,
}));
