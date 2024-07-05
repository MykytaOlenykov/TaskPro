import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState, AppDispatch } from "store";
import type { IError } from "types";

interface IAppAsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: IError | null;
}

type ICreateAppAsyncThunk = ReturnType<
  typeof createAsyncThunk.withTypes<IAppAsyncThunkConfig>
>;

export const createAppAsyncThunk: ICreateAppAsyncThunk =
  createAsyncThunk.withTypes<IAppAsyncThunkConfig>();
