import { render, screen } from "@testing-library/react";
import PostComment from "../../components/pieces/post/PostComment";
import "@testing-library/jest-dom";

describe("PostComment ", () => {
  it("renders the Post Comment data correctly", () => {
    const comment = {
      id: 1,
      user: "John",
      date: "2022/12/27",
      content: "This is a comment",
      postId: 2,
    };

    render(<PostComment comment={comment}>Nothing</PostComment>);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("2022/12/27")).toBeInTheDocument();
    expect(screen.getByText("This is a comment")).toBeInTheDocument();
  });
});
