import { getCourses } from "./courseActions";
import { LOAD_COURSES_SUCCESS, BEGIN_API_CALL } from "../constants";
import { courses } from "../../../tools/mockData";

import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Action", () => afterEach(() => fetchMock.restore()));

describe("Create Course Success...", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    fetchMock.mock("*", {
      body: courses,
      headers: { "content-type": "applicatio/json" },
    });

    const expectedAction = [
      { type: LOAD_COURSES_SUCCESS, courses },
      { type: BEGIN_API_CALL },
    ];

    const store = mockStore({ courses: [] });

    return store
      .dispatch(getCourses())
      .then(() => expect(store.getActions()).toEqual(expectedAction));
  });
});
