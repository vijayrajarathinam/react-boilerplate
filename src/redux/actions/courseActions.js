import { CREATE_COURSE, LOAD_COURSES_SUCCESS } from "../constants";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  return { type: CREATE_COURSE, course };
}

export function getCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => dispatch({ type: LOAD_COURSES_SUCCESS, courses }))
      .catch((err) => {
        throw err;
      });
  };
}
