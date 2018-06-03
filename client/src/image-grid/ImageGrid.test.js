import React from "react";
import ReactDOM from "react-dom";
import ImageGrid from "./ImageGrid";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });
describe("<ImageGrid />", () => {
  // It should render.
  it("should render empty", () => {
    const wrapper = shallow(<ImageGrid images={[]} />);
    expect(wrapper.find(".image-grid-item").exists()).toBe(false);
  });

  // It should render image-grid-items
  it("should render 1 item", () => {
    const wrapper = shallow(
      <ImageGrid
        images={[
          {
            id: "unique-id",
            url: "https://someurl/image.png",
            context: "https://someurl/contextn.html",
            snippet: "Incredible image"
          }
        ]}
      />
    );
    expect(wrapper.find(".image-grid-item").exists()).toBe(true);
    expect(wrapper.find(".image-grid-item").length).toBe(1);
    expect(wrapper.find(".image-grid-item-image").prop("src")).toBe(
      "https://someurl/image.png"
    );
    expect(wrapper.find(".image-grid-item-url").prop("href")).toBe(
      "https://someurl/contextn.html"
    );
  });

  // Compare with sanpshot
  test("matches saved snapshot", () => {
    const wrapper = shallow(<ImageGrid images={[]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
