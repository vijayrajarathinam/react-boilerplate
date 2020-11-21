import React from "react";
import CourseForm from "./CourseForm";
// import renderer from "react-test-renderer";
// import { courses, authors } from "../../tools/mockData";
import { shallow } from "enzyme";

function renderCourseForm(args) {
  const defaultProps = {
    course: {},
    authors: [],
    onSave: () => {},
    onChange: () => {},
    saving: false,
    errors: {},
  };
  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it("render component form and header", () => {
  const wrapper = renderCourseForm();

  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it("set submit button label to saving..., when saving is true", () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find("button").text()).toEqual("Saving...");
});

// it("set submit button label to saving..., when saving is true", () => {
//   const tree = renderer.create(
//     <CourseForm
//       course={courses[0]}
//       authors={authors}
//       onSave={jest.fn()}
//       onChange={jest.fn()}
//       saving
//     />
//   );

//   expect(tree).toMatchSnapshot();
// });
