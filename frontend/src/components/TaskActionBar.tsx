import React, { useState } from "react";
import { IconButton, Menu, MenuItem, styled, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import { useAppDispatch, useAppSelector } from "hooks";
import { changeTaskColumn, deleteTask, editTask } from "store/tasks/operations";
import { selectColumns } from "store/columns/selectors";

import { TaskForm } from "./TaskForm";
import { DeleteModal } from "ui/DeleteModal";
import { Modal } from "ui/Modal";

import type { ITask } from "types";

const Button = styled(IconButton)(({ theme }) => ({
  padding: 0,
  color: theme.palette.text.primary,
  opacity: 0.5,
  "&:hover": {
    color: theme.palette.text.primaryAccent,
  },
}));

const ColumnMenu = styled(Menu)(({ theme }) => ({
  marginTop: 24,
  ".MuiPaper-root": {
    backgroundImage: "none",
    backgroundColor: theme.palette.background.popup,
    borderRadius: 8,
    boxShadow: "0 4px 16px 0 rgba(17, 17, 17, 0.1)",
  },
  ".MuiList-root": {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 18,
    minWidth: 135,
    maxWidth: 180,
  },
}));

const ColumnItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 0,
  color: theme.palette.text.popup,
  "&:hover": {
    color: theme.palette.text.primaryAccent,
    background: "none !important",
  },
  "&.Mui-selected": {
    color: theme.palette.text.primaryAccent,
    background: "none !important",
  },
}));

const ColumnName = styled(Typography)(() => ({
  fontSize: 14,
  letterSpacing: "-0.02em",
  color: "inherit",
}));

interface IProps {
  taskId: string;
  taskName: string;
  taskComment: string | null;
  taskPriorityId: string | null;
  taskDeadline: string;
  columnId: string;
}

export const TaskActionBar: React.FC<IProps> = ({
  columnId,
  taskId,
  taskComment,
  taskDeadline,
  taskName,
  taskPriorityId,
}) => {
  const dispatch = useAppDispatch();

  const columns = useAppSelector(selectColumns);

  const [anchorElColumnMenu, setAnchorElColumnMenu] =
    useState<null | HTMLElement>(null);

  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);

  const handleOpenColumnMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElColumnMenu(event.currentTarget);
  };

  const handleCloseColumnMenu = () => {
    setAnchorElColumnMenu(null);
  };

  const handleChangeColumn = (columnId: string) => {
    handleCloseColumnMenu();
    dispatch(changeTaskColumn({ _id: taskId, column_id: columnId }));
  };

  const handleOpenEditTask = () => {
    setOpenEditTask(true);
  };

  const handleOpenDeleteTask = () => {
    setOpenDeleteTask(true);
  };

  const handleCloseEditTask = (
    reason: "backdropClick" | "escapeKeyDown" | "button"
  ) => {
    if (reason === "backdropClick") return;
    setOpenEditTask(false);
  };

  const handleEditTask = (data: Omit<ITask, "_id" | "column_id">) => {
    setOpenEditTask(false);
    dispatch(editTask({ ...data, _id: taskId }));
  };

  const handleCloseDeleteTask = () => {
    setOpenDeleteTask(false);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "16px",
        gap: 8,
      }}
    >
      <Button type="button" onClick={handleOpenColumnMenu}>
        <ArrowCircleRightOutlinedIcon sx={{ width: 20, height: 20 }} />
      </Button>
      {Boolean(anchorElColumnMenu) && (
        <ColumnMenu
          id="column-menu"
          anchorEl={anchorElColumnMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElColumnMenu)}
          onClose={handleCloseColumnMenu}
        >
          {columns
            .filter(({ _id }) => _id !== columnId)
            .map(({ _id, name }) => (
              <ColumnItem
                key={_id}
                onClick={() => handleChangeColumn(_id)}
                disableRipple
                disableTouchRipple
                disableGutters
              >
                <ColumnName textAlign="center" variant="body1" noWrap>
                  {name}
                </ColumnName>
                <ArrowCircleRightOutlinedIcon sx={{ width: 20, height: 20 }} />
              </ColumnItem>
            ))}
        </ColumnMenu>
      )}

      <Button type="button" onClick={handleOpenEditTask}>
        <EditOutlinedIcon sx={{ width: 20, height: 20 }} />
      </Button>
      <Button type="button" onClick={handleOpenDeleteTask}>
        <DeleteOutlineOutlinedIcon sx={{ width: 20, height: 20 }} />
      </Button>

      <Modal open={openEditTask} onClose={handleCloseEditTask}>
        <TaskForm
          taskName={taskName}
          taskComment={taskComment}
          taskPriorityId={taskPriorityId}
          taskDeadline={taskDeadline}
          buttonText="Edit"
          title="Edit card"
          onSubmitForm={handleEditTask}
        />
      </Modal>
      <DeleteModal
        text={`Are you sure you want to delete the task?`}
        open={openDeleteTask}
        onClose={handleCloseDeleteTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};
