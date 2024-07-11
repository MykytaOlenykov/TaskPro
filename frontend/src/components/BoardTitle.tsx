import React from "react";
import { useParams } from "react-router-dom";
import { styled, Typography } from "@mui/material";

import { useAppSelector } from "hooks";
import { selectBoards } from "store/boards/selectors";

const Title = styled(Typography)(({ theme }) => ({
  maxWidth: "calc(100vw / 2 - 32px)",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
  [theme.breakpoints.up("md")]: {
    fontSize: 18,
  },
}));

export const BoardTitle: React.FC = () => {
  const { boardId } = useParams();
  const boards = useAppSelector(selectBoards);
  const name = boards.find(({ _id }) => _id === boardId)?.name;

  return <Title noWrap>{name}</Title>;
};
