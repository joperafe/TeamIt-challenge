import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../components/Header";

describe("Header ", () => {
  it("page renders the correct content", () => {
    render(<Header />);

    expect(screen.getByText("Blog")).toBeInTheDocument();
  });
});
