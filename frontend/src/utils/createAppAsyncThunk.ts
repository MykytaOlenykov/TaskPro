import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState, AppDispatch } from "store";

interface IAppAsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: any;
}

type ICreateAppAsyncThunk = ReturnType<
  typeof createAsyncThunk.withTypes<IAppAsyncThunkConfig>
>;

export const createAppAsyncThunk: ICreateAppAsyncThunk =
  createAsyncThunk.withTypes<IAppAsyncThunkConfig>();
