import userEvent from "@testing-library/user-event";
import {
  renderWithProviders,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from "../../tests";
import CatImageModal from "./CatImageModal";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ imageId: "6sn" })
}));

// eslint-disable-next-line testing-library/no-render-in-setup
beforeEach(() => renderWithProviders(<CatImageModal />));

test("loading message appears initially on the screen when page loads", () => {
  expect(screen.getByText("Loading cat image...")).toBeInTheDocument();
});

test("cat image appears on the screen after loading message along with favourite message", async () => {
  const catImage = await screen.findByRole("img");
  expect(catImage).toBeInTheDocument();
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("favourite icon appears on the screen after image loading and it is not filled", async () => {
  // eslint-disable-next-line testing-library/prefer-query-by-disappearance
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

  // eslint-disable-next-line testing-library/no-node-access
  expect(screen.getByLabelText("starIcon")).toBeInTheDocument();
});

test("clicking star icon makes the image favourite by making the star filled", async () => {
  await userEvent.click(screen.getByLabelText("starIcon"));

  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() =>
    expect(screen.getByLabelText("fiiledStarIcon")).toBeInTheDocument()
  );
});

test("clicking on modal's x icon triggers modal close", async () => {
  const xMarkIcon = await screen.findByLabelText("xMarkIcon");
  xMarkIcon.onclick = jest.fn();

  await userEvent.click(xMarkIcon);
  expect(xMarkIcon.onclick).toHaveBeenCalledTimes(1);
});
