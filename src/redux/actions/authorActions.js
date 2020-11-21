import { LOAD_AUTHORS_SUCCESS } from "../constants";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, endApiCall } from "./apiStatusActions";

export function getAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => dispatch({ type: LOAD_AUTHORS_SUCCESS, authors }))
      .catch((err) => {
        dispatch(endApiCall());
        throw err;
      });
  };
}
