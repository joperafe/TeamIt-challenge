import React from "react";
import { render } from "@testing-library/react";
import InputSearch from "../../components/pieces/InputSearch";
import "@testing-library/jest-dom/extend-expect";

describe("InputSearch", () => {
  it("renders the input element with the correct value", () => {
    const searchTerm = "test";
    const { getByPlaceholderText } = render(<InputSearch searchTerm={searchTerm} setSearchTerm={() => {}} />);
    const input: any = getByPlaceholderText("Search posts...");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(searchTerm);
  });
});
