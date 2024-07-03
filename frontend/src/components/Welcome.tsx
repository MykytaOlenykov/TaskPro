import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Link as MuiLink,
  Button as MuiButton,
  styled,
} from "@mui/material";

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

const LogoIconBox = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 40,

  backgroundColor: "#161616",
  borderRadius: 8,
}));

const LogoIcon = styled(Logo)(() => ({
  width: 15,
  height: 20,

  fill: "#fff",
}));

const LogoText = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: 28,
  letterSpacing: "-0.04em",
  color: "#161616",
}));

const Text = styled(Typography)(() => ({
  marginBottom: "48px",
  maxWidth: 473,
  textAlign: "center",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1.29,
  letterSpacing: "-0.02em",
  color: "#161616",
}));

const Button = styled(MuiButton)(() => ({
  marginBottom: 14,
  padding: "14px 8px",
  width: "100%",

  fontWeight: 500,
  fontSize: 14,
  letterSpacing: "-0.02em",
  color: "#fff",

  backgroundColor: "#161616",
  borderRadius: 8,

  ":hover": {
    backgroundColor: "#161616",
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
      <Button onClick={() => navigate("/auth/register")}>Registration</Button>
      <MuiLink
        component={Link}
        to="/auth/login"
        underline="hover"
        fontWeight={500}
        fontSize={14}
        letterSpacing="-0.02em"
        color="#161616"
      >
        Log In
      </MuiLink>
    </>
  );
};
