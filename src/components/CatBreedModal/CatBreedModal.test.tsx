/* eslint-disable @typescript-eslint/no-unused-vars */
import userEvent from "@testing-library/user-event";

import { renderWithProviders, screen, waitFor } from "../../tests";
import CatBreedModal from "./CatBreedModal";

describe("valid breedId", () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ breedId: "aege" })
  }));

  // eslint-disable-next-line testing-library/no-render-in-setup
  beforeEach(() => renderWithProviders(<CatBreedModal />));

  test("loading message appears initially on the screen when page loads", () => {
    expect(screen.getByText("Loading cat breed images...")).toBeInTheDocument();
  });

  test("cat breed images appear on the screen after loading message", async () => {
    const catImages = await screen.findAllByRole("img");
    expect(catImages).toHaveLength(10);
  });

  test("clicking on modal's x icon triggers modal close", async () => {
    const xMarkIcon = await screen.findByLabelText("xMarkIcon");
    xMarkIcon.onclick = jest.fn();

    await userEvent.click(xMarkIcon);
    expect(xMarkIcon.onclick).toHaveBeenCalledTimes(1);
  });
});

describe("invalid breedId", () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ breedId: "aegean" })
  }));

  test("displays the correct message if user inserts invalid breedId", async () => {
    renderWithProviders(<CatBreedModal />);

    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      expect(
        screen.getByText("There does not seem to be such breed category.")
      ).toBeInTheDocument();
    });
  });
});
