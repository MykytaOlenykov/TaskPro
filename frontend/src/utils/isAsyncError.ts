import type { IAsyncError } from "types";

export const isAsyncError = (error: unknown): error is IAsyncError => {
  if (typeof error === "object" && error !== null) {
    const err = error as IAsyncError;
    return "statusCode" in err && "message" in err;
  }
  return false;
};
