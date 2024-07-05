import { Middleware, isRejected } from "@reduxjs/toolkit";

import type { RootState } from "store";
import { isAsyncError } from "utils";

export const asyncErrorMiddleware: any =
  (): Middleware<object, RootState> => () => (next) => (action) => {
    if (!isRejected(action)) return next(action);
    if (!isAsyncError(action.payload)) return next(action);

    console.log(action.payload.message, action.payload.statusCode);

    next(action);
  };
