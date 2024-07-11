import React from "react";

interface IProps {
  columnId: string;
  columnName: string;
}

export const ColumnCard: React.FC<IProps> = ({ columnId, columnName }) => {
  return (
    <>
      {columnId}: {columnName}
    </>
  );
};
