import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "hooks";
import { getBoard } from "store/boards/operations";
import {
  selectBoardNotFound,
  selectLoadingBoard,
} from "store/boards/selectors";

import { ColumnsList } from "components/ColumnsList";
import { NotFoundSubPage } from "ui/NotFoundSubPage";

const ScreensPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const loading = useAppSelector(selectLoadingBoard);
  const boardNotFound = useAppSelector(selectBoardNotFound);

  useEffect(() => {
    boardId && dispatch(getBoard(boardId));
  }, [boardId, dispatch]);

  if (boardNotFound) {
    return <NotFoundSubPage />;
  }

  return loading ? null : <ColumnsList />;
};

export default ScreensPage;
