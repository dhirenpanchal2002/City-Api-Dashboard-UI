import { render, screen } from "@testing-library/react";
import AppHeader from "./AppHeader";
import "@testing-library/jest-dom";

test("renders dashboard header", async () => {
  render(<AppHeader />);
  // Should show header with active style/text
  expect(screen.getByText("API Data Dashboard")).toBeInTheDocument();
});
