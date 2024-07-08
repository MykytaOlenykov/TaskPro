import React from "react";
import { Typography, Box, styled, ButtonBase } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import decorativeIcon from "assets/images/decorative-icon.png";

const Container = styled(Box)(({ theme }) => ({
  padding: 14,
  borderRadius: 8,
  backgroundColor: theme.palette.background.default,
}));

const Icon = styled("div")(() => ({
  width: 54,
  height: 78,
  marginBottom: 14,
  backgroundImage: `url(${decorativeIcon})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
}));

const Text = styled(Typography)(({ theme }) => ({
  marginBottom: 18,
  paddingRight: 4,
  fontWeight: 400,
  fontSize: 12,
  lineHeight: 1.33,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primarySideBar,
}));

const AccentText = styled("span")(({ theme }) => ({
  color: theme.palette.text.primaryAccent,
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  display: "flex",
  fontWeight: 500,
  fontSize: 12,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primarySideBar,
  borderRadius: 8,
}));

const HelpIcon = styled(HelpOutlineOutlinedIcon)(() => ({
  marginRight: 8,
  width: 20,
  height: 20,
}));

export const Help: React.FC = () => {
  return (
    <Container>
      <Icon />
      <Text variant="body1">
        If you need help with <AccentText>TaskPro</AccentText>, check out our
        support resources or reach out to our customer support team.
      </Text>
      <Button>
        <HelpIcon />
        Need help?
      </Button>
    </Container>
  );
};
