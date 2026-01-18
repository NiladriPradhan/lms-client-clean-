import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getRTKErrorMessage = (
  error: FetchBaseQueryError | SerializedError,
): string => {
  // FetchBaseQueryError
  if ("status" in error) {
    // HTTP error with response body
    if (typeof error.data === "object" && error.data !== null) {
      const data = error.data as { message?: string };
      if (data.message) return data.message;
    }

    // Network / timeout / custom error
    if ("error" in error && typeof error.error === "string") {
      return error.error;
    }

    return "Something went wrong";
  }

  // SerializedError
  return error.message ?? "Something went wrong";
};

// export const getRTKErrorMessage = (
//   error: FetchBaseQueryError | SerializedError | undefined,
// ): string | null => {
//   if (!error) return null;

//   if ("status" in error) {
//     if (typeof error.data === "object" && error.data !== null) {
//       return (error.data as any).message ?? error.error;
//     }
//     return error.error;
//   }

//   return error.message ?? "Something went wrong";
// };
