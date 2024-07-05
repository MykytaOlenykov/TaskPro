import type { IAsyncError } from "types";

export const isAsyncError = (error: unknown): error is IAsyncError => {
  if (typeof error === "object" && error !== null) {
    const err = error as IAsyncError;
    return (
      typeof err.statusCode === "number" && typeof err.message === "string"
    );
  }
  return false;
};
