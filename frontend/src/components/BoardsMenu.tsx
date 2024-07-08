import React from "react";
import { Box, Typography, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BaseButton } from "ui/BaseButton";

const Container = styled(Box)(({ theme }) => ({
  padding: "0 14px",
  [theme.breakpoints.up("md")]: {
    padding: "0 20px",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: 8,
  fontWeight: 400,
  fontSize: 12,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  color: theme.palette.text.light,
}));

const BtnContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 0",

  "&::after, &::before": {
    content: "''",
    position: "absolute",
    left: 0,
    height: 1,
    width: "100%",
    backgroundColor: theme.palette.background.sideBarLine,
  },
  "&::after": {
    top: 0,
    transform: "translateY(-50%)",
  },
  "&::before": {
    bottom: 0,
    transform: "translateY(50%)",
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primarySideBar,
}));

const Button = styled(BaseButton)(({ theme }) => ({
  padding: "8px 10px",
  maxWidth: 40,
  minWidth: 0,
  backgroundColor: theme.palette.background.sideBarButton,
}));

export const BoardsMenu: React.FC = () => {
  return (
    <Container>
      <Title variant="body1">My boards</Title>
      <BtnContainer>
        <Text variant="body1">
          Create a<br /> new board
        </Text>
        <Button aria-label="create a new board">
          <AddIcon style={{ width: "20px", height: "20px" }} />
        </Button>
      </BtnContainer>
    </Container>
  );
};
