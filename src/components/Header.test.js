import React from "react";
// import Header from "./Header.jsx";
import { cleanup, render } from "@testing-library/react";
import CourseForm from "./CourseForm";

afterEach(cleanup);

function renderCourseForm(args) {
  const defaultProps = {
    course: {},
    errors: {},
    authors: [],
    saving: false,
    onSave: () => {},
    onChange: () => {},
  };
  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render add course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it("should say save..", () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText("Saving...");
});

// import { mount, shallow } from "enzyme";
// import { MemoryRouter } from "react-router-dom";

// it("contains 3 navlinks", () => {
//   const numLinks = shallow(<Header />).find("NavLink").length;
//   expect(numLinks).toBe(3);
// });

// it("contains 3 achor (Mount)", () => {
//   const numAnchors = mount(
//     <MemoryRouter>
//       <Header />
//     </MemoryRouter>
//   ).find("a").length;

//   expect(numAnchors).toBe(3);
// });
