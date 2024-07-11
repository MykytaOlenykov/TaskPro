import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { List, ListItem, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch } from "hooks";
import { createColumn } from "store/columns/operations";

import { BaseButton } from "ui/BaseButton";
import { Modal } from "ui/Modal";
import { ColumnForm } from "./ColumnForm";

import type { IColumn } from "types";

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  gap: 34,
  margin: 0,
  padding: 0,
  overflowX: "auto",
  scrollbarColor: `${theme.palette.background.default} ${theme.palette.background.primarySideBar}`,
  scrollbarWidth: "thin",
}));

const StyledListItem = styled(ListItem)(() => ({
  maxWidth: 335,
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
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

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
