import React from "react";
import { useParams } from "react-router-dom";

const ScreensPage: React.FC = () => {
  const { boardId } = useParams();

  return <p>{boardId}</p>;
};

export default ScreensPage;
