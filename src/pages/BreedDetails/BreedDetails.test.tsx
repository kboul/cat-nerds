import userEvent from "@testing-library/user-event";

import { renderWithProviders, screen } from "../../tests";
import BreedDetails from "./BreedDetails";
import { capitalize } from "./utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ breedId: "aege" })
}));

describe("loading & response success", () => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  beforeEach(() => renderWithProviders(<BreedDetails />));

  test("loading message appears initially on the screen when page loads", () => {
    expect(screen.getByText("Loading breed details...")).toBeInTheDocument();
  });

  test("a table appears on the screen with the breed info", async () => {
    expect(await screen.findByRole("table")).toBeInTheDocument();
  });

  test("clicking on a url navigates to the relevant page", async () => {
    window.open = jest.fn();

    const wikipediaUrl = "https://en.wikipedia.org/wiki/Aegean_cat";

    const wikipediaUrlEl = await screen.findByText(wikipediaUrl);
    await userEvent.click(wikipediaUrlEl);
    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(wikipediaUrl, "_blank");
  });
});

describe("capitalize with empty input", () => {
  expect(capitalize("")).toEqual("");
});
