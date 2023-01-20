import userEvent from "@testing-library/user-event";

import { renderWithProviders, screen, waitFor } from "../../tests";
import Navbar from "./Navbar";

// eslint-disable-next-line testing-library/no-render-in-setup
beforeEach(() => renderWithProviders(<Navbar />));

test("navbar has an app name", () => {
  expect(screen.getByText("Cat Nerds")).toBeInTheDocument();
});

test("navbar has 3 routes to navigate", () => {
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("clicking a nav item makes it selected", async () => {
  const catImagesLink = screen.getByText("Cat images");

  const textBlueClass = "text-blue-700";
  expect(catImagesLink).not.toHaveClass(textBlueClass);
  userEvent.click(catImagesLink);
  await waitFor(() => expect(catImagesLink).toHaveClass(textBlueClass));
});

test("clicking burger icon toggles the nav items on mobile screens", async () => {
  const burgerIcon = screen.getByLabelText("burgerIcon");
  const menu = screen.getByLabelText("menu");

  const hiddenClass = "hidden";
  expect(menu).toHaveClass(hiddenClass);
  userEvent.click(burgerIcon);
  // eslint-disable-next-line testing-library/await-async-utils
  await waitFor(() => expect(menu).not.toHaveClass(hiddenClass));
});
