import React from "react";
import { styled, Typography } from "@mui/material";

import Logo from "assets/images/logo.svg?react";

const LogoContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
}));

const LogoIconBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 32,
  height: 32,

  backgroundColor: theme.palette.background.logo,
  borderRadius: 8,
}));

const LogoIcon = styled(Logo)(({ theme }) => ({
  display: "block",
  width: 12,
  height: 16,

  fill: theme.palette.icon?.logo,
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 16,
  letterSpacing: "-0.04em",
  color: theme.palette.icon?.logo,
}));

export const AppLogo: React.FC = () => {
  return (
    <LogoContainer>
      <LogoIconBox>
        <LogoIcon />
      </LogoIconBox>
      <LogoText variant="body1">Task Pro</LogoText>
    </LogoContainer>
  );
};
