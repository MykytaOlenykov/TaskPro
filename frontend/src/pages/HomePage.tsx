import React, { useEffect } from "react";

import { useAppDispatch } from "hooks";
import { getBoards } from "store/boards/operations";

import { Layout } from "components/Layout";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  return <Layout />;
};

export default HomePage;
