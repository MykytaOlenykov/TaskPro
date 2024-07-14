import React from "react";
import { List, ListItem, styled } from "@mui/material";

import { useAppSelector } from "hooks";
import { selectTasks } from "store/tasks/selectors";
import { TaskCard } from "./TaskCard";

const StyledList = styled(List)({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 0,
});

interface IProps {
  columnId: string;
}

export const TasksList: React.FC<IProps> = ({ columnId }) => {
  const tasks = useAppSelector(selectTasks);

  return (
    <StyledList>
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
            />
          </ListItem>
        ))}
    </StyledList>
  );
};
