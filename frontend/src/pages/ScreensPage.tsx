import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "hooks";
import { getBoard } from "store/boards/operations";

import { ColumnsList } from "components/ColumnsList";

const ScreensPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  useEffect(() => {
    boardId && dispatch(getBoard(boardId));
  }, [boardId, dispatch]);

  return <ColumnsList />;
};

export default ScreensPage;
