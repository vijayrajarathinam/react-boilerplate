import { BEGIN_API_CALL, API_CALL_ERROR } from "../constants";
import initialState from "./initialState";

function _isSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type == BEGIN_API_CALL) return state + 1;
  else if (action.type == API_CALL_ERROR || _isSuccess(action.type))
    return state - 1;
  return state;
}
