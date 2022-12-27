import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "../../components/Layout";

describe("Layout ", () => {
  it("page renders the correct content", () => {
    const props = { title: "Some title", description: "This is a short description" };

    render(<Layout {...props}>Children</Layout>);

    // expect(screen.getByLabelText("Some title")).toBeInTheDocument();
    expect(screen.getByRole("link", { href: "/" })).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });
});
