import { renderWithProviders, screen } from "../../tests";
import NoMatch from "./NoMatch";

test("page message appears on the page as expected", () => {
  renderWithProviders(<NoMatch />);
  expect(screen.getByText("Nothing to see here!")).toBeInTheDocument();
  expect(screen.getByText("Go to the home page")).toBeInTheDocument();
});
