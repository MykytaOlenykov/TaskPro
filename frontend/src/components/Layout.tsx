import React, { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { styled, useTheme, useMediaQuery, LinearProgress } from "@mui/material";

import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { Filter } from "./Filter";

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

const FilterContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 14,
  right: 20,
  [theme.breakpoints.up("md")]: {
    top: 20,
    right: 32,
  },
  [theme.breakpoints.up("lg")]: {
    top: 14,
    right: 24,
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
  const isDekstop = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(isDekstop);

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
      <Main open={open && isDekstop}>
        <FilterContainer>
          <Filter />
        </FilterContainer>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Main>
    </>
  );
};
