import React from "react";
import { List, ListItem, styled } from "@mui/material";

import { useAppSelector } from "hooks";
import { selectFilteredTasks } from "store/tasks/selectors";

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
  const filteredTasks = useAppSelector(selectFilteredTasks);
  const visibledTasks = filteredTasks.filter(
    ({ column_id }) => column_id === columnId
  );

  return visibledTasks.length ? (
    <StyledList style={{ maxHeight: taskListMaxHeight }}>
      {visibledTasks.map(({ _id, name, comment, priority_id, deadline }) => (
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
  ) : null;
};
