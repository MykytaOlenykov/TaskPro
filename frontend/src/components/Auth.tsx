import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Box, styled } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
  padding: 24,
  maxWidth: 424,
  width: "100%",

  backgroundColor: theme.palette.background.primaryBox,
  borderRadius: 8,

  [theme.breakpoints.up("md")]: {
    padding: 40,
  },
}));

const AuthLink = styled(NavLink)(() => ({
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  textDecoration: "none",
  color: "rgba(255, 255, 255, 0.3)",
  "&.active": {
    color: "inherit",
  },
}));

export const Auth: React.FC = () => {
  return (
    <Container>
      <Box style={{ display: "flex", gap: 14, marginBottom: 40 }}>
        <AuthLink to="/auth/register">Registration</AuthLink>
        <AuthLink to="/auth/login">Log In</AuthLink>
      </Box>

      <Outlet />
    </Container>
  );
};
