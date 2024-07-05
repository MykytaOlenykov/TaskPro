import { Middleware, isRejected } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import type { RootState } from "store";
import { isAsyncError } from "utils";

export const asyncErrorMiddleware: any =
  (): Middleware<object, RootState> => () => (next) => (action) => {
    if (!isRejected(action)) return next(action);
    if (!isAsyncError(action.payload)) return next(action);

    toast.error(action.payload.message);

    if (action.payload.statusCode === 401) {
      //
    }

    next(action);
  };
