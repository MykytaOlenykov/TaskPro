import React, { useState } from "react";
import { format } from "date-fns";
import { IconButton, Menu, MenuItem, styled, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import { useAppDispatch, useAppSelector } from "hooks";
import { selectTaskPriorities } from "store/tasks/selectors";
import { changeTaskColumn, deleteTask, editTask } from "store/tasks/operations";
import { selectColumns } from "store/columns/selectors";

import { TaskForm } from "./TaskForm";
import { DeleteModal } from "ui/DeleteModal";
import { Modal } from "ui/Modal";

import type { ITask } from "types";

const Card = styled("div")<{ statusColor?: string }>(
  ({ theme, statusColor }) => ({
    position: "relative",
    padding: "14px 20px 14px 24px",
    width: "100%",
    backgroundColor: theme.palette.background.primary,
    borderRadius: 8,
    overflow: "hidden",
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: 4,
      backgroundColor: statusColor ?? theme.palette.text.primary,
      opacity: statusColor ? 1 : 0.3,
    },
  })
);

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: 8,
  fontWeight: 600,
  fontSize: 14,
  letterSpacing: "-0.02em",
  lineHeight: 1.5,
  color: theme.palette.text.primary,
}));

const Description = styled(Typography)(({ theme }) => ({
  position: "relative",
  marginBottom: 28,
  fontWeight: 400,
  fontSize: 12,
  lineHeight: 1.33,
  letterSpacing: "-0.02em",
  color: theme.palette.text.secondary,

  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  textOverflow: "ellipsis",
}));

const CardBar = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",

  "&::after": {
    content: "''",
    position: "absolute",
    top: -13.5,
    left: 0,
    height: 1,
    width: "100%",
    backgroundColor: theme.palette.text.primary,
    opacity: 0.1,
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  marginBottom: 4,
  fontWeight: 400,
  fontSize: 8,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
  opacity: 0.5,
}));

const SubText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 10,
  letterSpacing: "-0.02em",
  color: theme.palette.text.primary,
}));

const PriorityStatus = styled("div")<{ statusColor?: string }>(
  ({ theme, statusColor }) => ({
    width: 12,
    height: 12,
    backgroundColor: statusColor ?? theme.palette.text.primary,
    opacity: statusColor ? 1 : 0.3,
    borderRadius: "100%",
  })
);

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

export const TaskCard: React.FC<IProps> = ({
  taskId,
  taskName,
  taskComment,
  taskPriorityId,
  taskDeadline,
  columnId,
}) => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(selectColumns);
  const taskPriorities = useAppSelector(selectTaskPriorities);
  const taskPriority = taskPriorities.find(({ _id }) => _id === taskPriorityId);
  const parsedTaskDeadline = new Date(taskDeadline + "T00:00:00");
  const formattedTaskDeadline = format(parsedTaskDeadline, "dd/MM/yyyy");

  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [anchorElColumnMenu, setAnchorElColumnMenu] =
    useState<null | HTMLElement>(null);

  const handleOpenEditTask = () => {
    setOpenEditTask(true);
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

  const handleOpenDeleteTask = () => {
    setOpenDeleteTask(true);
  };

  const handleCloseDeleteTask = () => {
    setOpenDeleteTask(false);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(taskId));
  };

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

  return (
    <Card statusColor={taskPriority?.color}>
      <Title
        variant="body1"
        noWrap
        style={{ marginBottom: taskComment ? undefined : "28px" }}
      >
        {taskName}
      </Title>
      {taskComment && <Description variant="body1">{taskComment}</Description>}
      <CardBar>
        <div style={{ marginRight: "14px" }}>
          <SubTitle variant="body1">Priority</SubTitle>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <PriorityStatus statusColor={taskPriority?.color} />
            <SubText>{taskPriority?.name ?? "Without"}</SubText>
          </div>
        </div>
        <div style={{ marginRight: "auto" }}>
          <SubTitle variant="body1">Deadline</SubTitle>
          <SubText>{formattedTaskDeadline}</SubText>
        </div>
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
                  <ArrowCircleRightOutlinedIcon
                    sx={{ width: 20, height: 20 }}
                  />
                </ColumnItem>
              ))}
          </ColumnMenu>

          <Button type="button" onClick={handleOpenEditTask}>
            <EditOutlinedIcon sx={{ width: 20, height: 20 }} />
          </Button>
          <Button type="button" onClick={handleOpenDeleteTask}>
            <DeleteOutlineOutlinedIcon sx={{ width: 20, height: 20 }} />
          </Button>
        </div>
      </CardBar>

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
    </Card>
  );
};
