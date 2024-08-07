import { isAxiosError } from "axios";

import type { IAsyncError } from "types";

const errorMessages = {
  400: "Invalid request. Please check your input.",
  401: "Unauthorized. Please log in.",
  403: "Forbidden. You don't have access.",
  404: "Not found. The resource doesn't exist.",
  409: "Conflict. Please try again later.",
  500: "Something went wrong. Please try again later.",
};

export const convertAsyncError = (error: unknown): IAsyncError => {
  if (isAxiosError(error)) {
    if (error.code === "ERR_CANCELED") {
      return { statusCode: "ERR_CANCELED", message: "" };
    }

    const statusCode = (error.response?.status ??
      500) as keyof typeof errorMessages;

    return { statusCode, message: errorMessages[statusCode] };
  }

  return { statusCode: 500, message: errorMessages[500] };
};
