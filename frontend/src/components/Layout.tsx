import React, { useState } from "react";
import { Container } from "@mui/material";

import { Header } from "./Header";
import { SideBar } from "./SideBar";

const Layout: React.FC = () => {
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
      <Container></Container>
    </>
  );
};

export default Layout;
