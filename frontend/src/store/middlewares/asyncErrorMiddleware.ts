import { Middleware, isRejected } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import type { RootState } from "store";
import { isAsyncError } from "utils";
import { logOut } from "store/auth/operations";

export const asyncErrorMiddleware: any =
  (): Middleware<object, RootState> => (store) => (next) => (action) => {
    if (!isRejected(action)) return next(action);
    if (!isAsyncError(action.payload)) return next(action);
    if (action.payload.statusCode === "ERR_CANCELED") return next(action);

    toast.error(action.payload.message);

    if (action.payload.statusCode === 401) {
      return next(store.dispatch({ type: logOut.fulfilled.type }));
    }

    next(action);
  };
