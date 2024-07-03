import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";

import { Container } from "ui/Container";
import { NotFound } from "ui/NotFound";

const GoBackLink = styled(Link)(({ theme }) => ({
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  color: theme.palette.common.black,
}));

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <NotFound />
      <GoBackLink to="/welcome">Go back</GoBackLink>
    </Container>
  );
};

export default NotFoundPage;
