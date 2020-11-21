import {
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  LOAD_COURSES_SUCCESS,
  DELETE_COURSE_OPTIMISTIC,
} from "../constants";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, endApiCall } from "./apiStatusActions";

export function getCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => dispatch({ type: LOAD_COURSES_SUCCESS, courses }))
      .catch((err) => {
        dispatch(endApiCall());
        throw err;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((saveCourse) =>
        course.id
          ? dispatch({ type: UPDATE_COURSE_SUCCESS, saveCourse })
          : dispatch({ type: CREATE_COURSE_SUCCESS, saveCourse })
      )
      .catch((err) => {
        dispatch(endApiCall());
        throw err;
      });
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    dispatch({ type: DELETE_COURSE_OPTIMISTIC, course });
    return courseApi.deleteCourse(course.id);
  };
}
