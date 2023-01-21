import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import { catBreedsUrl } from "../../api";
import { renderWithProviders, screen, server, waitFor } from "../../tests";
import CatBreedModal from "./CatBreedModal";

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

test.skip("server error generates the appropriate message on the screen", async () => {
  server.resetHandlers(
    rest.get(catBreedsUrl, (req, res, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const breedIds = req.url.searchParams.get("breed_ids");

      res(ctx.status(500));
    })
  );
  renderWithProviders(<CatBreedModal />);

  await waitFor(async () => {
    expect(
      await screen.findByText(
        "There was an error while fetching the cat breed images."
      )
    ).toBeInTheDocument();
  });
});
