import { BEGIN_API_CALL, API_CALL_ERROR } from "../constants";

export function beginApiCall() {
  return { type: BEGIN_API_CALL };
}

export function endApiCall() {
  return { type: API_CALL_ERROR };
}
