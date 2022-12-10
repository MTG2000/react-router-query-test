import { render, screen } from "@/utils/tests.utils";
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom";
import CharactersPage from "../CharactersPage";

describe("Characters Page", () => {
  it("renders correctly", async () => {
    renderWithProviders();
    expect(await screen.findByText(/Character 1/i)).toBeInTheDocument();
  });
});

const renderWithProviders = () => {
  const router = createMemoryRouter(
    [{ path: "/characters", element: <CharactersPage /> }],
    {
      initialEntries: ["/characters"],
    }
  );
  render(<RouterProvider router={router} />);
};
