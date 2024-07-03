import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Link as MuiLink, styled } from "@mui/material";

import { BaseButton } from "ui/BaseButton";

import userIcon from "assets/images/user-icon.png";
import Logo from "assets/images/logo.svg?react";

const UserIcon = styled("div")(() => ({
  marginBottom: 14,
  width: 124,
  height: 124,

  backgroundImage: `url(${userIcon})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% auto",
  backgroundPosition: "center",
}));

const LogoContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 14,
  marginBottom: 24,
}));

const LogoIconBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 40,

  backgroundColor: theme.palette.common.black,
  borderRadius: 8,
}));

const LogoIcon = styled(Logo)(() => ({
  width: 15,
  height: 20,

  fill: "#fff",
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 28,
  letterSpacing: "-0.04em",
  color: theme.palette.common.black,
}));

const Text = styled(Typography)(({ theme }) => ({
  marginBottom: "48px",
  maxWidth: 473,
  textAlign: "center",
  fontSize: 14,
  lineHeight: 1.29,
  letterSpacing: "-0.02em",
  color: theme.palette.common.black,
}));

const RegisterButton = styled(BaseButton)(({ theme }) => ({
  marginBottom: 14,
  maxWidth: 344,
  color: "#fff",
  backgroundColor: theme.palette.common.black,

  ":hover": {
    backgroundColor: theme.palette.common.black,
  },
}));

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <UserIcon />
      <LogoContainer>
        <LogoIconBox>
          <LogoIcon />
        </LogoIconBox>
        <LogoText variant="body1">Task Pro</LogoText>
      </LogoContainer>
      <Text variant="body1">
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don't wait, start achieving your goals now!
      </Text>
      <RegisterButton onClick={() => navigate("/auth/register")}>
        Registration
      </RegisterButton>
      <MuiLink
        component={Link}
        to="/auth/login"
        underline="hover"
        fontWeight={500}
        fontSize={14}
        letterSpacing="-0.02em"
        color={(theme) => theme.palette.common.black}
      >
        Log In
      </MuiLink>
    </>
  );
};
