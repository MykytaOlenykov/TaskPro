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

const UserName = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: 14,
  letterSpacing: "-0.02em",
}));

const Placeholder = styled(AvatarPlaceholder)(({ theme }) => ({
  width: 32,
  height: 22.5,
  fill: theme.palette.icon?.avatarPlaceholder,
  alignSelf: "end",
}));

export const UserMenu: React.FC = () => {
  const userName = useAppSelector(selectUserName);

  return (
    <Container>
      <UserName>{userName}</UserName>
      <UserAvatar alt={userName ?? ""} src={TestUserAvatar}>
        <Placeholder />
      </UserAvatar>
    </Container>
  );
};
