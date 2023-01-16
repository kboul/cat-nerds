import { renderWithProviders, screen } from "../../tests";
import CatImageModal from "./CatImageModal";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ catImageId: "cdr" })
}));

test("loading message appears initially on the screen when page loads", () => {
  renderWithProviders(<CatImageModal />);
  expect(screen.getByText("Loading cat image...")).toBeInTheDocument();
});

test("cat image appear on the screen after loading message along with favourite message", async () => {
  renderWithProviders(<CatImageModal />);
  const catImage = await screen.findByRole("img");
  expect(catImage).toBeInTheDocument();
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
