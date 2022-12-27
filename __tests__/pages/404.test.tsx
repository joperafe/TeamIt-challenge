import { render, screen } from "@testing-library/react";
import PageNotFound from "../../pages/404";
import "@testing-library/jest-dom";

describe("404 ", () => {
  it("page renders the correct content", () => {
    render(<PageNotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
