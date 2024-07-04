import { Button, styled } from "@mui/material";

export const BaseButton = styled(Button)(({ theme }) => ({
  padding: "14px 8px",
  width: "100%",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  textTransform: "none",
  borderRadius: 8,
  color: theme.palette.text.primaryButton,
  backgroundColor: theme.palette.background.primaryButton,
  "&:hover": {
    backgroundColor: theme.palette.background.primaryButtonHover,
  },
}));
