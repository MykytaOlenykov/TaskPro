import React from "react";
import { List, ListItem, styled } from "@mui/material";

import { useAppSelector } from "hooks";
import { selectTasks } from "store/tasks/selectors";
import { TaskCard } from "./TaskCard";

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 0,
  overflowY: "auto",
  scrollbarColor: `${theme.palette.background.scrollThumb} ${theme.palette.background.scrollBar}`,
}));

interface IProps {
  columnId: string;
  taskListMaxHeight: number;
}

export const TasksList: React.FC<IProps> = ({
  columnId,
  taskListMaxHeight,
}) => {
  const tasks = useAppSelector(selectTasks);

  return (
    <StyledList style={{ maxHeight: taskListMaxHeight }}>
      {tasks
        .filter(({ column_id }) => column_id === columnId)
        .map(({ _id, name, comment, priority_id, deadline }) => (
          <ListItem key={_id} disablePadding>
            <TaskCard
              taskId={_id}
              taskName={name}
              taskComment={comment}
              taskPriorityId={priority_id}
              taskDeadline={deadline}
              columnId={columnId}
            />
          </ListItem>
        ))}
    </StyledList>
  );
};
