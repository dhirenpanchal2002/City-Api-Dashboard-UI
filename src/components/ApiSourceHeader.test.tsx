import { fireEvent, render, screen } from "@testing-library/react";
import ApiSourceHeader from "./ApiSourceHeader";
import "@testing-library/jest-dom";

describe("ApiSourceHeader Component", () => {
  test("renders api source header component with Legacy API details", async () => {
    render(
      <ApiSourceHeader
        selectedApi={"Legacy"}
        ApirUrl={"http://localhost:8000/Api/Legacy/data"}
        sourceChangeHandler={function (): void {}}
      />
    );
    // Should show header with active style/text
    expect(screen.getByText("Legacy")).toBeInTheDocument();

    // Should show header with active style/text
    expect(
      screen.getByText("http://localhost:8000/Api/Legacy/data")
    ).toBeInTheDocument();
  });
  test("renders api source header component with New API details", async () => {
    render(
      <ApiSourceHeader
        selectedApi={"New"}
        ApirUrl={"http://localhost:8000/Api/New/data"}
        sourceChangeHandler={function (): void {}}
      />
    );

    // Should show header with active style/text
    expect(screen.getByText("New")).toBeInTheDocument();

    // Should show header with active style/text
    expect(
      screen.getByText("http://localhost:8000/Api/New/data")
    ).toBeInTheDocument();
  });
  test("calls sourceChangeHandler when button is clicked", async () => {
    const mockSourceChangeHandler = jest.fn();

    render(
      <ApiSourceHeader
        selectedApi={"Legacy"}
        ApirUrl={"http://localhost:8000/Api/Legacy/data"}
        sourceChangeHandler={mockSourceChangeHandler}
      />
    );

    // Simulate button click
    const button = screen.getByRole("button", { name: /Switch to New API/i });
    fireEvent.click(button);

    // Assert the mock function was called
    expect(mockSourceChangeHandler).toHaveBeenCalled();
  });
});
