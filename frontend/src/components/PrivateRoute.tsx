import React from "react";

import { useAppSelector } from "hooks";
import { selectLoggedIn, selectRefreshing } from "store/auth/selectors";
import { Navigate } from "react-router-dom";

interface IProps {
  redirectTo?: string;
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<IProps> = ({
  redirectTo = "/welcome",
  children,
}) => {
  const loggedIn = useAppSelector(selectLoggedIn);
  const refreshing = useAppSelector(selectRefreshing);

  return !refreshing && !loggedIn ? <Navigate to={redirectTo} /> : children;
};
