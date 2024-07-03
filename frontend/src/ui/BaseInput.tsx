import { OutlinedInput, styled } from "@mui/material";

export const BaseInput = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  borderRadius: 8,
  boxShadow: "0 4px 16px 0 rgba(22, 22, 22, 0.08)",
  opacity: 0.4,
  backgroundColor: theme.palette.background.primaryInput,
  ".MuiOutlinedInput-input": {
    padding: "14px 18px",
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: "-0.02em",
    "::placeholder": {
      color: theme.palette.text.primary,
      opacity: 1,
    },
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.border?.input,
  },
  "&.Mui-focused, &.not-empty": {
    opacity: 1,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline, &.not-empty .MuiOutlinedInput-notchedOutline":
    {
      borderWidth: 1,
      borderColor: theme.palette.border?.input,
    },
}));
