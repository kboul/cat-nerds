import { rest } from "msw";
import userEvent from "@testing-library/user-event";

import { favouriteUrl } from "../../api";
import { renderWithProviders, screen, server, waitFor } from "../../tests";
import FavouriteCats from "./FavouriteCats";

describe("loading & response success state", () => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  beforeEach(() => renderWithProviders(<FavouriteCats />));

  test("loading message appears initially on the screen when page loads", () => {
    expect(screen.getByText("Loading favourite cats...")).toBeInTheDocument();
  });

  test("favourite cat images appear on the screen after loading message", async () => {
    const catImage = await screen.findByRole("img");
    expect(catImage).toBeInTheDocument();
  });

  test("favourite star icon appears on the screen and is filled", async () => {
    const filledStarIcon = await screen.findByLabelText("FilledStaredIcon");
    expect(filledStarIcon).toBeInTheDocument();
  });

  test("clicking favourite star icon removes the image from favourites page", async () => {
    const filledStarIcon = await screen.findByLabelText("FilledStaredIcon");

    await userEvent.click(filledStarIcon);
    await waitFor(() => {
      expect(
        screen.queryByLabelText("FilledStaredIcon")
      ).not.toBeInTheDocument();
    });
  });
});

describe("response failure state", () => {
  test("server error generates the appropriate message on the screen", async () => {
    server.resetHandlers(
      rest.get(`${favouriteUrl}?sub_id=kboul`, (_, res, ctx) =>
        res(ctx.status(500))
      )
    );
    renderWithProviders(<FavouriteCats />);

    await waitFor(async () => {
      expect(
        await screen.findByText(
          "There was an error while fetching favourite cat images."
        )
      ).toBeInTheDocument();
    });
  });
});