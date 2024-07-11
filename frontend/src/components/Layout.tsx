import React, { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { styled, useTheme, useMediaQuery, LinearProgress } from "@mui/material";

import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { Filter } from "./Filter";
import { BoardTitle } from "./BoardTitle";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  position: "relative",
  flexGrow: 1,
  padding: "74px 20px 60px",
  height: "calc(100vh - 60px)",
  overflow: "hidden",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 260,
  }),
  [theme.breakpoints.up("md")]: {
    padding: "80px 32px 96px",
    height: "calc(100vh - 68px)",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "48px 24px 36px",
  },
}));

const Container = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 14,
  left: 0,
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  padding: "0 20px",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    top: 20,
    left: 0,
    padding: "0 32px",
  },
  [theme.breakpoints.up("lg")]: {
    top: 10,
    left: 0,
    padding: "0 24px",
  },
}));

const Loader = styled(LinearProgress)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  backgroundColor: theme.palette.background.secondaryLoader,
  ".MuiLinearProgress-bar": {
    backgroundColor: theme.palette.background.primaryLoader,
  },
}));

export const Layout: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(isDesktop);

  const handleOpenSideBar = () => {
    setOpen(true);
  };

  const handleCloseSideBar = () => {
    setOpen(false);
  };

  return (
    <>
      <Header onOpenSideBar={handleOpenSideBar} />
      <SideBar open={open} onCloseSideBar={handleCloseSideBar} />
      <Main open={open && isDesktop}>
        <Container>
          <BoardTitle />
          <Filter />
        </Container>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Main>
    </>
  );
};
