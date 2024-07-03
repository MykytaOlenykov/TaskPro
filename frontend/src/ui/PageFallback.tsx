import React from "react";
import { CircularProgress, styled } from "@mui/material";

import { Container } from "./Container";

const Spinner = styled(CircularProgress)(({ theme }) => ({
  width: "80px !important",
  height: "80px !important",
  color: theme.palette.common.black,
}));

export const PageFallback: React.FC = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};
