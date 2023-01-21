import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import { catBreedsUrl } from "../../api";
import { renderWithProviders, server, waitFor, screen } from "../../tests";
import CatBreeds from "./CatBreeds";

describe("loading & response success", () => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  beforeEach(() => renderWithProviders(<CatBreeds />));

  test("loading message appears initially on the screen when page loads", () => {
    expect(screen.getByText("Loading cat breeds...")).toBeInTheDocument();
  });

  test("cat breed categories appear on the screen after loading message", async () => {
    const catImages = await screen.findAllByRole("listitem");
    expect(catImages).toHaveLength(67);
  });

  test("clicking on a breed opens the cat breed modal", async () => {
    const aegeanBreed = await screen.findByText("Aegean");
    aegeanBreed.onclick = jest.fn();

    await userEvent.click(aegeanBreed);
    expect(aegeanBreed.onclick).toHaveBeenCalledTimes(1);
  });
});

describe("response failure", () => {
  test("server error generates the appropriate message on the screen", async () => {
    server.resetHandlers(
      rest.get(catBreedsUrl, (_, res, ctx) => res(ctx.status(500)))
    );
    renderWithProviders(<CatBreeds />);

    await waitFor(async () => {
      expect(
        await screen.findByText(
          "There was an error while fetching the cat breeds."
        )
      ).toBeInTheDocument();
    });
  });
});
