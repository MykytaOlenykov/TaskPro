import React from "react";
import { Avatar, Typography, styled } from "@mui/material";

import { useAppSelector } from "hooks";
import { selectUserName } from "store/auth/selectors";

import AvatarPlaceholder from "assets/images/avatar-placeholder.svg?react";
import TestUserAvatar from "assets/images/userTest.jpg";

const Container = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
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

  return (
    <Container>
      <UserName noWrap>{userName}</UserName>
      <UserAvatar alt={userName ?? ""} src={TestUserAvatar}>
        <Placeholder />
      </UserAvatar>
    </Container>
  );
};
