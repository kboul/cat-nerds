import { rest } from "msw";
import userEvent from "@testing-library/user-event";

import {
  renderWithProviders,
  screen,
  waitFor,
  server,
  waitForElementToBeRemoved
} from "../../tests";
import { catImagesUrl } from "../../api";
import CatImages from "./CatImages";

test("loading message appears initially on the screen when page loads", () => {
  renderWithProviders(<CatImages />);
  expect(screen.getByText("Loading cat images...")).toBeInTheDocument();
});

test("cat images appear on the screen after loading message", async () => {
  renderWithProviders(<CatImages />);

  const catImages = await screen.findAllByRole("img");
  expect(catImages).toHaveLength(10);
});

test("clicking load more button adds 20 images on the screen", async () => {
  renderWithProviders(<CatImages />);

  const moreBtn = await screen.findByRole("button", { name: "Load more" });
  await userEvent.click(moreBtn);
  // eslint-disable-next-line testing-library/prefer-query-by-disappearance
  await waitForElementToBeRemoved(screen.getByText("Loading cat images..."));

  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(async () => {
    expect(await screen.findAllByRole("img")).toHaveLength(20);
  });
});

test("server error generates the appropriate message on the screen", async () => {
  server.resetHandlers(
    rest.get(catImagesUrl, (_, res, ctx) => res(ctx.status(500)))
  );
  renderWithProviders(<CatImages />);

  await waitFor(async () => {
    expect(
      await screen.findByText(
        "There was an error while fetching the cat images."
      )
    ).toBeInTheDocument();
  });
});
