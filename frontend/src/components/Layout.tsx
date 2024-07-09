import React, { useState } from "react";
import { styled, Typography, useTheme, useMediaQuery } from "@mui/material";

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

const Layout: React.FC = () => {
  const theme = useTheme();
  const isDekstop = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(false);

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
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
      </Main>
    </>
  );
};

export default Layout;
