import { TApiErrorResponse } from "../typedefs";

export function parseApiErrorMessage(err: unknown) {
  if (!isApiErrorMessage(err)) {
    return "Something went wrong";
  }

  let errorMessage = "";
  if (Array.isArray(err?.data?.message)) {
    errorMessage = err.data.message.join(", ");
  } else {
    errorMessage = err?.data?.message || "Please try again later";
  }

  return errorMessage;
}

export function getApiErrorStatusCode(err: unknown) {
  if (!isApiErrorMessage(err)) return 500;

  return err.status;
}

export function getApiErrorAttemptRemaining(err: unknown) {
  if (!isApiErrorMessage(err)) return 3;

  const attemptRemaining = err.data?.attemptRemaining;

  return attemptRemaining;
}

export function isApiErrorMessage(err: unknown): err is TApiErrorResponse {
  return (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    "data" in err &&
    typeof err.data === "object" &&
    err.data !== null
  );
}
