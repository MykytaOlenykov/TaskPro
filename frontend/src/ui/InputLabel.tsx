import { InputLabel as MuiInputLabel, styled } from "@mui/material";

export const InputLabel = styled(MuiInputLabel)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  letterSpacing: "-0.02em",
  lineHeight: 1.5,
  color: theme.palette.text.primary,
}));
