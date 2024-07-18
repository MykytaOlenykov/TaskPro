import React from "react";
import { Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import avatarPlaceholder from "assets/images/avatar-placeholder.svg";

const Container = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  margin: "0 auto 24px",
  width: 68,
  height: 68,
  fontFamily: "inherit",
  borderRadius: 8,
  backgroundColor: theme.palette.background.default,
  backgroundImage: `url(${avatarPlaceholder})`,
  backgroundSize: "100% 48px",
  backgroundPosition: "center bottom",
  backgroundRepeat: "no-repeat",
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const UserAvatar: React.FC = () => {
  return (
    <Container>
      <Button
        sx={(theme) => ({
          position: "absolute",
          left: "50%",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          width: "24px",
          height: "24px",
          minWidth: 0,
          backgroundColor: theme.palette.background.sideBarButton,
          transform: "translate(-50%, 50%)",
          borderRadius: "6px",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: theme.palette.background.sideBarButton,
          },
        })}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
      >
        <AddIcon style={{ width: "16px", height: "16px" }} />
        <VisuallyHiddenInput type="file" />
      </Button>
    </Container>
  );
};
