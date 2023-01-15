import { rest } from "msw";

import {
  renderWithQueryClient,
  screen,
  waitFor
} from "../../tests/renderWithQueryClient";
import { baseUrl } from "../../api/baseUrl";
import server from "../../tests/server";
import CatImages from "./CatImages";

test("loading message appears initially on the screen when page loads", () => {
  renderWithQueryClient(<CatImages />);
  expect(screen.getByText("Loading cat images...")).toBeInTheDocument();
});

test("cat images appear on the screen after loading message", async () => {
  renderWithQueryClient(<CatImages />);

  const catImages = await screen.findAllByRole("img");
  expect(catImages).toHaveLength(10);
});

test("server error generates the appropriate message on the screen", async () => {
  server.resetHandlers(
    rest.get(baseUrl, (_, res, ctx) => res(ctx.status(500)))
  );
  renderWithQueryClient(<CatImages />);

  await waitFor(async () => {
    expect(
      await screen.findByText(
        "There was an error while fetching the cat images."
      )
    ).toBeInTheDocument();
  });
});
