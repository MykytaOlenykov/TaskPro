import React from "react";
import { ButtonBase, styled } from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

const Button = styled(ButtonBase)(({ theme }) => ({
  justifyContent: "start",
  gap: 14,
  fontWeight: 500,
  fontSize: 14,
  color: theme.palette.text.primarySideBar,
  borderRadius: 8,
}));

const Icon = styled(LoginRoundedIcon)(({ theme }) => ({
  width: 32,
  height: 32,
  color: theme.palette.icon?.logOut,
}));

export const LogOut: React.FC = () => {
  return (
    <Button>
      <Icon />
      Log out
    </Button>
  );
};
