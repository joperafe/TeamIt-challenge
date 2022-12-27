import { render, screen } from "@testing-library/react";
import PostCard from "../../components/pieces/post/PostCard";
import "@testing-library/jest-dom";

describe("PostCard ", () => {
  it("renders the PostCard data correctly", () => {
    const post = {
      id: 1,
      title: "title",
      author: "me",
      publish_date: "2022-11-11",
      slug: "slug",
      description: "This description",
      content: "some content",
    };

    render(<PostCard post={post} />);

    expect(screen.getByText("This description")).toBeInTheDocument();
  });
});
