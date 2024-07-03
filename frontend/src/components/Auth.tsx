import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { styled } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
  padding: 24,
  maxWidth: 424,
  width: "100%",

  backgroundColor: theme.palette.background.primaryBox,
  borderRadius: 8,
}));

const AuthLink = styled(NavLink)(() => ({
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  textDecoration: "none",
  color: "inherit",
  ["&.active"]: {
    color: "rgba(255, 255, 255, 0.3)",
  },
}));

export const Auth: React.FC = () => {
  return (
    <Container>
      <div style={{ display: "flex", gap: 14, marginBottom: 40 }}>
        <AuthLink to="/auth/register">Registration</AuthLink>
        <AuthLink to="/auth/login">Log In</AuthLink>
      </div>

      <Outlet />
    </Container>
  );
};
