import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { List, styled, ListItem, useTheme, useMediaQuery } from "@mui/material";

import { useAppSelector } from "hooks";
import { selectBoards } from "store/board/selectors";
import { BoardCard } from "./BoardCard";

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  margin: 0,
  padding: 0,
  overflowY: "auto",
  scrollbarColor: `${theme.palette.background.default} ${theme.palette.background.primarySideBar}`,
  scrollbarWidth: "thin",
}));

export const BoardsList: React.FC = () => {
  const { boardId } = useParams();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up("md"));

  const boards = useAppSelector(selectBoards);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const minHeight = 61 * 3 + 4 * 2;

  const mobileMaxHeight = windowHeight - 600;
  const tabletMaxHeight = windowHeight - 652;
  const maxHeight = isTablet ? tabletMaxHeight : mobileMaxHeight;

  useEffect(() => {
    const updateMaxHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateMaxHeight);

    return () => {
      window.removeEventListener("resize", updateMaxHeight);
    };
  }, []);

  return (
    <div
      style={{
        padding: "40px 0",
      }}
    >
      <StyledList
        style={{
          maxHeight: maxHeight < minHeight ? minHeight : maxHeight,
          minHeight,
        }}
      >
        {boards.map(({ _id, name, icon_id, background_id }) => {
          const selected = boardId === _id;

          return (
            <ListItem key={_id} disablePadding>
              <BoardCard
                _id={_id}
                name={name}
                iconId={icon_id}
                backgroundId={background_id}
                selected={selected}
              />
            </ListItem>
          );
        })}
      </StyledList>
    </div>
  );
};
