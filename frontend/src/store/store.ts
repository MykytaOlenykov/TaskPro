import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/slice";
import { asyncErrorMiddleware } from "./middlewares";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncErrorMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
