import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState, AppDispatch } from "store";
import type { IAsyncError } from "types";

interface IAppAsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: IAsyncError | null;
}

type ICreateAppAsyncThunk = ReturnType<
  typeof createAsyncThunk.withTypes<IAppAsyncThunkConfig>
>;

export const createAppAsyncThunk: ICreateAppAsyncThunk =
  createAsyncThunk.withTypes<IAppAsyncThunkConfig>();
