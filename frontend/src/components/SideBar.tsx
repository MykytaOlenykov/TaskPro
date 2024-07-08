import React from "react";
import { Box, Drawer, IconButton, styled } from "@mui/material";
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
  },
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "14px 0",
  width: 225,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.sideBar,
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  padding: 4,
  color: theme.palette.text.primarySideBar,
}));

export const SideBar: React.FC<IProps> = ({ open, onCloseSideBar }) => {
  return (
    <StyledDrawer open={open} onClose={onCloseSideBar} variant="temporary">
      <Container>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 14px",
            marginBottom: 70,
          }}
        >
          <AppLogo />
          <CloseButton onClick={onCloseSideBar}>
            <ChevronLeftIcon />
          </CloseButton>
        </Box>
        <BoardsMenu />
        <Box
          style={{ padding: "0 14px", marginTop: "auto", marginBottom: "24px" }}
        >
          <Help />
        </Box>
        <Box style={{ padding: "0 14px" }}>
          <LogOut />
        </Box>
      </Container>
    </StyledDrawer>
  );
};
