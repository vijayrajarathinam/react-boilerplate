import { combineReducers } from "redux";
import coursesReducer from "./courseReducer";

const rootReducer = combineReducers({ coursesReducer });

export default rootReducer;
