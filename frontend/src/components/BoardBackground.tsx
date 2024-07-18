import React from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material";

import { useAppSelector } from "hooks";
import { selectBackgrounds } from "store/static/selectors";
import { selectBoards } from "store/boards/selectors";

const VITE_API_STATIC_URL = import.meta.env.VITE_API_STATIC_URL;

const Container = styled("div")<{ url: string }>(({ url }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: -1,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${VITE_API_STATIC_URL + url})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

export const BoardBackground: React.FC = () => {
  const { boardId } = useParams();

  const backgrounds = useAppSelector(selectBackgrounds);
  const boards = useAppSelector(selectBoards);
  const boardBackgroundId = boards.find(
    ({ _id }) => _id === boardId
  )?.background_id;
  const background = backgrounds.find(({ _id }) => _id === boardBackgroundId);

  if (!background) return null;

  return <Container url={background.baseUrl} />;
};
