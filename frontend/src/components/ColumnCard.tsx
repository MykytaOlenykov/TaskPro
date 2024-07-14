import React, { useState } from "react";
import { IconButton, styled, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useAppDispatch } from "hooks";
import { deleteColumn, editColumn } from "store/columns/operations";
import { createTask } from "store/tasks/operations";

import { DeleteModal } from "./DeleteModal";
import { ColumnForm } from "./ColumnForm";
import { TaskForm } from "./TaskForm";
import { Modal } from "ui/Modal";
import { ButtonWithIcon } from "ui/ButtonWithIcon";

import type { IColumn, ITask } from "types";

interface IProps {
  columnId: string;
  columnName: string;
}

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 14,
  width: "100%",
}));

const ColumnTitleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "16px 20px",
  minHeight: 56,
  backgroundColor: theme.palette.background.task,
  borderRadius: 8,
}));

const ColumnTitle = styled(Typography)(({ theme }) => ({
  marginRight: "auto",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
}));

const Button = styled(IconButton)(({ theme }) => ({
  padding: 0,
  color: theme.palette.text.primary,
  opacity: 0.5,
  "&:hover": {
    color: theme.palette.text.primaryAccent,
  },
}));

export const ColumnCard: React.FC<IProps> = ({ columnId, columnName }) => {
  const dispatch = useAppDispatch();

  const [openEditColumn, setOpenEditColumn] = useState(false);
  const [openDeleteColumn, setOpenDeleteColumn] = useState(false);
  const [openCreateTask, setOpenCreateTask] = useState(false);

  const handleOpenEditColumn = () => {
    setOpenEditColumn(true);
  };

  const handleCloseEditColumn = (
    reason: "backdropClick" | "escapeKeyDown" | "button"
  ) => {
    if (reason === "backdropClick") return;
    setOpenEditColumn(false);
  };

  const handleEditColumn = (data: Pick<IColumn, "name">) => {
    dispatch(editColumn({ ...data, _id: columnId }));
    setOpenEditColumn(false);
  };

  const handleOpenDeleteColumn = () => {
    setOpenDeleteColumn(true);
  };

  const handleCloseDeleteColumn = () => {
    setOpenDeleteColumn(false);
  };

  const handleDeleteColumn = () => {
    dispatch(deleteColumn(columnId));
  };

  const handleOpenCreateTask = () => {
    setOpenCreateTask(true);
  };

  const handleCloseCreateTask = (
    reason: "backdropClick" | "escapeKeyDown" | "button"
  ) => {
    if (reason === "backdropClick") return;
    setOpenCreateTask(false);
  };

  const handleCreateTask = (data: Omit<ITask, "_id" | "column_id">) => {
    setOpenCreateTask(false);
    dispatch(createTask({ ...data, column_id: columnId }));
  };

  return (
    <Container>
      <ColumnTitleContainer>
        <ColumnTitle noWrap>{columnName}</ColumnTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "16px",
            gap: 8,
          }}
        >
          <Button type="button" onClick={handleOpenEditColumn}>
            <EditOutlinedIcon sx={{ width: 20, height: 20 }} />
          </Button>
          <Button type="button" onClick={handleOpenDeleteColumn}>
            <DeleteOutlineOutlinedIcon sx={{ width: 20, height: 20 }} />
          </Button>
        </div>
      </ColumnTitleContainer>
      <Modal open={openEditColumn} onClose={handleCloseEditColumn}>
        <ColumnForm
          columnName={columnName}
          title="Edit column"
          buttonText="Edit"
          onSubmitForm={handleEditColumn}
        />
      </Modal>
      <DeleteModal
        text={`Are you sure you want to delete the column "${columnName}"? Its tasks will also be deleted.`}
        open={openDeleteColumn}
        onClose={handleCloseDeleteColumn}
        onDelete={handleDeleteColumn}
      />

      <ButtonWithIcon type="button" onClick={handleOpenCreateTask}>
        Add another card
      </ButtonWithIcon>
      <Modal open={openCreateTask} onClose={handleCloseCreateTask}>
        <TaskForm
          buttonText="Add"
          title="Add card"
          onSubmitForm={handleCreateTask}
        />
      </Modal>
    </Container>
  );
};
