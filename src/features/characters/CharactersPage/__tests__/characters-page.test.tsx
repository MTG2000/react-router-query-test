import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from "@/utils/tests.utils";
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

  it("filters changes listed results", async () => {
    renderWithProviders();

    expect(screen.queryAllByText(/Alive/i)).toBeDefined();

    const statusFilterSelect = await screen.findByLabelText(/status/i);
    await userEvent.click(statusFilterSelect);

    const deadOption = await screen.findByTestId(`select-option Dead`);
    await userEvent.click(deadOption);

    await waitForElementToBeRemoved(screen.queryAllByText(/Alive/i));

    await userEvent.click(statusFilterSelect);
    const aliveOption = await screen.findByTestId(`select-option Alive`);
    await userEvent.click(aliveOption);

    expect(screen.queryAllByText(/Alive/i)).toBeDefined();
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
