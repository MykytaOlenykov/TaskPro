import React, { useState } from "react";
import { ButtonBase, Menu, MenuItem, Typography, styled } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import { useAppDispatch, useAppSelector } from "hooks";
import { changeTheme } from "store/auth/operations";
import { selectTheme } from "store/auth/selectors";

import type { IThemeMode } from "theme";

const Text = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  fontWeight: "500",
  fontSize: 14,
  lineHeight: 1.5,

  letterSpacing: "-0.02em",
  color: theme.palette.text.primaryHeader,
  cursor: "pointer",
}));

const ThemeMenu = styled(Menu)(({ theme }) => ({
  marginTop: 48,
  ".MuiPaper-root": {
    backgroundImage: "none",
    backgroundColor: theme.palette.background.modal,
    border: `1px solid ${theme.palette.border?.popup}`,
    borderRadius: 8,
    boxShadow: "0 4px 16px 0 rgba(17, 17, 17, 0.1)",
  },
  ".MuiList-root": {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 17,
    minWidth: 100,
  },
}));

const ThemeItem = styled(MenuItem)(({ theme }) => ({
  padding: 0,
  color: theme.palette.text.popup,

  "&:hover": {
    color: theme.palette.text.primaryAccent,
    background: "none !important",
  },
  "&.Mui-selected": {
    color: theme.palette.text.primaryAccent,
    background: "none !important",
  },
}));

const ThemeLabel = styled(Typography)(() => ({
  fontSize: 14,
  letterSpacing: "-0.02em",
  color: "inherit",
}));

const themes: { value: IThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "violet", label: "Violet" },
];

export const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const [anchorElTheme, setAnchorElTheme] = useState<null | HTMLElement>(null);

  const handleOpenThemeMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTheme(event.currentTarget);
  };

  const handleCloseThemeMenu = () => {
    setAnchorElTheme(null);
  };

  const handleChangeTheme = (value: IThemeMode) => {
    dispatch(changeTheme(value));
    handleCloseThemeMenu();
  };

  return (
    <>
      <ButtonBase sx={{ borderRadius: "8px" }}>
        <Text onClick={handleOpenThemeMenu}>
          Theme
          <ExpandMoreRoundedIcon
            color="inherit"
            sx={{ width: 20, height: 20, transform: "translateY(-1px)" }}
          />
        </Text>
      </ButtonBase>
      <ThemeMenu
        id="menu-appbar"
        anchorEl={anchorElTheme}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElTheme)}
        onClose={handleCloseThemeMenu}
      >
        {themes.map(({ value, label }) => (
          <ThemeItem
            key={value}
            onClick={() => handleChangeTheme(value)}
            disableRipple
            disableTouchRipple
            disableGutters
            selected={value === theme}
          >
            <ThemeLabel textAlign="center">{label}</ThemeLabel>
          </ThemeItem>
        ))}
      </ThemeMenu>
    </>
  );
};
