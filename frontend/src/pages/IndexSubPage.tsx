import React from "react";
import { Box, styled, Typography } from "@mui/material";

const MainContainer = styled(Box)(() => ({
  position: "relative",
  height: "100%",
}));

const Container = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "100%",
  maxWidth: 486 + 40,
  transform: "translate(-50%, -100%)",
  padding: "0 20px",
}));

const Text = styled(Typography)(({ theme }) => ({
  marginTop: "auto",
  marginBottom: "auto",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: 1.33,
  letterSpacing: "-0.02em",
  textAlign: "center",
  color: theme.palette.text.secondary,
  [theme.breakpoints.up("md")]: {
    fontSize: 14,
    lineHeight: 1.29,
  },
}));

const AccentText = styled(Text)(({ theme }) => ({
  color: theme.palette.text.primaryAccent,
}));

const BasePage: React.FC = () => {
  return (
    <MainContainer>
      <Container>
        <Text variant="body1">
          Before starting your project, it is essential{" "}
          <AccentText variant="body2">to create a board</AccentText> to
          visualize and track all the necessary tasks and milestones. This board
          serves as a powerful tool to organize the workflow and ensure
          effective collaboration among team members.
        </Text>
      </Container>
    </MainContainer>
  );
};

export default BasePage;
