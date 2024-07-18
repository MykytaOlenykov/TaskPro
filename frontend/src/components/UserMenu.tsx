import React, { useState } from "react";
import { Avatar, ButtonBase, Typography, styled } from "@mui/material";

import { useAppSelector } from "hooks";
import { selectUserName } from "store/auth/selectors";

import { Modal } from "ui/Modal";
import { UserForm } from "./UserForm";

import AvatarPlaceholder from "assets/images/avatar-placeholder.svg?react";

const Container = styled(ButtonBase)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  fontFamily: "inherit",
  borderRadius: 8,
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 8,
  backgroundColor: theme.palette.background.default,
}));

const UserName = styled(Typography)(({ theme }) => ({
  maxWidth: 80,
  fontWeight: 500,
  fontSize: 14,
  letterSpacing: "-0.02em",
  [theme.breakpoints.up("md")]: {
    maxWidth: 120,
  },
}));

const Placeholder = styled(AvatarPlaceholder)(({ theme }) => ({
  display: "block",
  width: 32,
  height: 22.5,
  fill: theme.palette.icon?.avatarPlaceholder,
  alignSelf: "end",
}));

export const UserMenu: React.FC = () => {
  const userName = useAppSelector(selectUserName);
  const [open, setOpen] = useState(false);

  const hanldeClose = (
    reason: "backdropClick" | "escapeKeyDown" | "button"
  ) => {
    if (reason === "backdropClick") return;
    setOpen(false);
  };

  return (
    <>
      <Container type="button" onClick={() => setOpen(true)}>
        <UserName noWrap>{userName}</UserName>
        <UserAvatar alt={userName ?? ""} src={undefined}>
          <Placeholder />
        </UserAvatar>
      </Container>
      <Modal open={open} onClose={hanldeClose}>
        <UserForm />
      </Modal>
    </>
  );
};
