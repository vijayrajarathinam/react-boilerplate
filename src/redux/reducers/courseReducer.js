// import { courses } from "../../../tools/mockData";
import {
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  LOAD_COURSES_SUCCESS,
  DELETE_COURSE_OPTIMISTIC,
} from "../constants";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case CREATE_COURSE_SUCCESS:
      return [...state, { ...action.saveCourse }];
    case UPDATE_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.saveCourse.id ? action.saveCourse : course
      );
    case LOAD_COURSES_SUCCESS:
      return action.courses;
    case DELETE_COURSE_OPTIMISTIC:
      console.log(state);
      console.log(action);
      return state.filter((course) => course.id !== action.course.id);
    default:
      return state;
  }
}
