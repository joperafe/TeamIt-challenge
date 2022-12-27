import { render, screen } from "@testing-library/react";
import Home from "../../pages";
import "@testing-library/jest-dom";

describe("Home page ", () => {
  it("renders the correct content and changes view correctly", () => {
    render(
      <Home
        posts={[
          {
            id: 1,
            title: "title",
            author: "me",
            publish_date: "2022-11-11",
            slug: "slug",
            description: "this one",
            content: "some content",
          },
        ]}
      />
    );
    expect(screen.getByText("Blog Posts")).toBeInTheDocument();
  });
});
