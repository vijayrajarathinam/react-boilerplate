import { LOAD_AUTHORS_SUCCESS } from "../constants";
import * as authorApi from "../../api/authorApi";

export function getAuthors() {
  return function (dispatch) {
    return authorApi
      .getAuthors()
      .then((authors) => dispatch({ type: LOAD_AUTHORS_SUCCESS, authors }))
      .catch((err) => {
        throw err;
      });
  };
}
