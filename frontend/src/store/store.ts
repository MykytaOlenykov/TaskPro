import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/slice";
import { staticReducer } from "./static/slice";
import { boardReducer } from "./boards/slice";
import { asyncErrorMiddleware } from "./middlewares";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    static: staticReducer,
    boards: boardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncErrorMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
