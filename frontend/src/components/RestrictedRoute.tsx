import React from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "hooks";
import { selectLoggedIn } from "store/auth/selectors";

interface IProps {
  redirectTo?: string;
  children: React.ReactNode;
}

export const RestrictedRoute: React.FC<IProps> = ({
  redirectTo = "/home",
  children,
}) => {
  const loggedIn = useAppSelector(selectLoggedIn);

  return loggedIn ? <Navigate to={redirectTo} /> : children;
};
