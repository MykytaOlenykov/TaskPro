import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/slice";
import { staticReducer } from "./static/slice";
import { boardsReducer } from "./boards/slice";
import { asyncErrorMiddleware } from "./middlewares";
import { columnsReducer } from "./columns/slice";
import { tasksReducer } from "./tasks/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    static: staticReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncErrorMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
