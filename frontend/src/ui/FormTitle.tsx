import { styled, Typography } from "@mui/material";

export const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: 24,
  fontWeight: 500,
  fontSize: 18,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
}));
