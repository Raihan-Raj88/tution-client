import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryError(
  error: any
): error is FetchBaseQueryError {
  return (error as FetchBaseQueryError).data !== undefined;
}
