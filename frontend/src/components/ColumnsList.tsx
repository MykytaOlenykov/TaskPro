import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { List, ListItem, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch, useAppSelector } from "hooks";
import { createColumn } from "store/columns/operations";
import { selectColumns } from "store/columns/selectors";

import { BaseButton } from "ui/BaseButton";
import { Modal } from "ui/Modal";
import { ColumnForm } from "./ColumnForm";
import { ColumnCard } from "./ColumnCard";

import type { IColumn } from "types";

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  alignItems: "start",
  gap: 34,
  margin: 0,
  padding: "0 20px 36px",
  height: "100%",
  overflowX: "auto",
  scrollbarColor: `${theme.palette.background.scrollThumb} ${theme.palette.background.scrollBar}`,
  [theme.breakpoints.up("md")]: {
    padding: "0 32px 64px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0 24px 28px",
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  flexShrink: 0,
  flexGrow: 1,
  maxWidth: "calc(100vw - 40px)",
  [theme.breakpoints.up("sm")]: {
    maxWidth: 335,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: 334,
  },
}));

const Button = styled(BaseButton)(({ theme }) => ({
  gap: 8,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.secondaryButton,
  "&:hover": {
    backgroundColor: theme.palette.background.secondaryButtonHover,
  },
}));

const AddIconContainer = styled("span")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 28,
  height: 28,
  color: theme.palette.background.secondaryButton,
  backgroundColor: theme.palette.background.secondaryAdd,
  borderRadius: 6,
}));

export const ColumnsList: React.FC = () => {
  const { boardId } = useParams();

  const dispatch = useAppDispatch();
  const columns = useAppSelector(selectColumns);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    reason: "backdropClick" | "escapeKeyDown" | "button"
  ) => {
    if (reason === "backdropClick") return;
    setOpen(false);
  };

  const handleCreateColumn = (data: Pick<IColumn, "name">) => {
    if (!boardId) return;
    dispatch(createColumn({ ...data, board_id: boardId }));
    setOpen(false);
  };

  return (
    <>
      <StyledList>
        {columns.map(({ _id, name }) => (
          <StyledListItem key={_id} disablePadding>
            <ColumnCard columnId={_id} columnName={name} />
          </StyledListItem>
        ))}
        <StyledListItem disablePadding>
          <Button onClick={handleOpen}>
            <AddIconContainer>
              <AddIcon style={{ width: 16, height: 16 }} />
            </AddIconContainer>
            Add another column
          </Button>
        </StyledListItem>
      </StyledList>
      <Modal open={open} onClose={handleClose}>
        <ColumnForm
          title="Add column"
          buttonText="Add"
          onSubmitForm={handleCreateColumn}
        />
      </Modal>
    </>
  );
};
