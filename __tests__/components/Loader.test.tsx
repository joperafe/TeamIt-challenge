import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "../../components/Loader";

describe("Loader ", () => {
  it("page renders the correct content", () => {
    render(<Loader />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
