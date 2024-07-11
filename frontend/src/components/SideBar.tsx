import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { AppLogo } from "./AppLogo";
import { BoardsMenu } from "./BoardsMenu";
import { Help } from "./Help";
import { LogOut } from "./LogOut";

interface IProps {
  open: boolean;
  onCloseSideBar: () => void;
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiBackdrop-root": {
    backgroundColor: theme.palette.background.backdrop,
  },
  ".MuiPaper-root": {
    boxShadow: "none",
    border: "none",
  },
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "14px 0",
  width: 225,
  minHeight: "100vh",
  overflowY: "auto",
  scrollbarColor: `${theme.palette.background.default} ${theme.palette.background.primarySideBar}`,
  scrollbarWidth: "thin",
  backgroundColor: theme.palette.background.primarySideBar,
  [theme.breakpoints.up("md")]: {
    padding: "24px 0",
    width: 260,
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: "0 14px",
  [theme.breakpoints.up("md")]: {
    padding: "0 20px",
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  padding: 4,
  color: theme.palette.text.primarySideBar,
}));

export const SideBar: React.FC<IProps> = ({ open, onCloseSideBar }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <StyledDrawer
      open={open}
      onClose={onCloseSideBar}
      variant={isDesktop ? "persistent" : "temporary"}
    >
      <Container>
        <StyledBox
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 70,
          }}
        >
          <AppLogo />
          <CloseButton onClick={onCloseSideBar}>
            <ChevronLeftIcon />
          </CloseButton>
        </StyledBox>
        <BoardsMenu onCloseSideBar={onCloseSideBar} />
        <StyledBox style={{ marginTop: "auto", marginBottom: "24px" }}>
          <Help />
        </StyledBox>
        <StyledBox>
          <LogOut />
        </StyledBox>
      </Container>
    </StyledDrawer>
  );
};
