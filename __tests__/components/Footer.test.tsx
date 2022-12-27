import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../../components/Footer";

describe("Footer ", () => {
  it("page renders the correct content", () => {
    render(<Footer />);

    expect(screen.getByText("Copyright \u00A9 TeamIt 2022")).toBeInTheDocument();
  });
});
