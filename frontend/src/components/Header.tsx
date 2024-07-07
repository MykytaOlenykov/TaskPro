import React from "react";
import { AppBar, Box, IconButton, Toolbar, styled } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundImage: "none",
  backgroundColor: theme.palette.background.header,
  boxShadow: "none",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    padding: "0 20px",
    minHeight: 60,
  },
  [theme.breakpoints.up("md")]: {
    padding: "0 32px",
    minHeight: 68,
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0 24px",
  },
}));

const BurgerIcon = styled(MenuRoundedIcon)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: 32,
    height: 32,
  },
}));

export const Header: React.FC = () => {
  return (
    <>
      <StyledAppBar>
        <StyledToolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <BurgerIcon />
          </IconButton>

          <Box sx={{ ml: "auto", mr: "10px" }}>
            <ThemeToggle />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <UserMenu />
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      <StyledToolbar />
    </>
  );
};
