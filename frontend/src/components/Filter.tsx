import React from "react";
import { ButtonBase, styled } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const Button = styled(ButtonBase)(({ theme }) => ({
  alignItems: "center",
  gap: 4,
  marginLeft: "auto",
  fontFamily: "inherit",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.428,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primaryFilter,
  borderRadius: 8,
}));

const Icon = styled(FilterAltOutlinedIcon)(() => ({
  width: 20,
  height: 20,
  strokeWidth: "1.5px",
}));

export const Filter: React.FC = () => {
  return (
    <Button type="button">
      <Icon />
      Filters
    </Button>
  );
};
