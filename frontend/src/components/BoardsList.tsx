import React from "react";
import { useParams } from "react-router-dom";
import { List, styled, ListItem } from "@mui/material";

import { useAppSelector } from "hooks";
import { selectBoards } from "store/boards/selectors";
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

interface IProps {
  onCloseSideBar: () => void;
}

export const BoardsList: React.FC<IProps> = ({ onCloseSideBar }) => {
  const { boardId } = useParams();

  const boards = useAppSelector(selectBoards);

  return (
    <StyledList
      style={{
        maxHeight: "100%",
        minHeight: 61 * 3 + 4 * 2,
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
              onCloseSideBar={onCloseSideBar}
            />
          </ListItem>
        );
      })}
    </StyledList>
  );
};
