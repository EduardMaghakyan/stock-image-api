import React from "react";
import ReactDOM from "react-dom";
import SearchForm from "./SearchForm";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });
describe("<SearchForm />", () => {
  // It should render.
  it("should render search form", () => {
    const wrapper = shallow(<SearchForm />);
    expect(wrapper.find("#query").props().value).toBe("");
    expect(wrapper.find("#search-submit").length).toBe(1);
  });
  // It allows to entery search query
  it("should render search form", () => {
    const wrapper = shallow(<SearchForm />);
    wrapper.find("#query").simulate("change", {
      target: { value: "My search query" }
    });
    expect(wrapper.find("#query").props().value).toBe("My search query");
  });

  // On click should call api with text entry
  it("should render search form", () => {
    const props = {
      handleSearch: jest.fn()
    };
    const wrapper = shallow(<SearchForm {...props} />);
    wrapper.find("form").simulate("submit", {
      preventDefault: () => {},
      target: { query: { value: "My search query" } }
    });
    expect(props.handleSearch).toHaveBeenCalledWith("My search query");
  });
  // Compare with sanpshot
  test("matches saved snapshot", () => {
    const wrapper = shallow(<SearchForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
