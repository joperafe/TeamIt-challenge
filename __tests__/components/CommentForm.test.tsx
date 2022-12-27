import { render, screen } from "@testing-library/react";
import CommentForm from "../../components/pieces/post/CommentForm";
import "@testing-library/jest-dom";

describe("CommentForm ", () => {
  it("renders the CommentForm data correctly", () => {
    const comment = {
      id: 1,
      user: "John",
      date: "2022/12/27",
      content: "This is a comment",
      postId: 2,
    };

    render(<CommentForm initialValue={comment.content} onSubmit={() => {}} loading={false} />);

    expect(screen.getByText("This is a comment")).toBeInTheDocument();
  });
});
