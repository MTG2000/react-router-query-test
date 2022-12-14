import { MOCKS_OVERRIDES } from '@/mocks/handlers';
import { server } from '@/mocks/server';
import { createRouter } from '@/router/rootRouter';
import { appRoutes } from '@/router/routes';
import {
  getByText,
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
  within,
} from '@/utils/tests.utils';
import { RouterProvider } from 'react-router-dom';

describe('Characters Page', () => {
  it('renders correctly', async () => {
    renderWithProviders();
    expect(await screen.findByText(/Character 1/i)).toBeInTheDocument();
  });

  it('filters changes listed results', async () => {
    renderWithProviders();

    expect(screen.getAllByText(/Alive/i)).toBeDefined();

    const statusFilterSelect = await screen.findByLabelText(/status/i);
    await userEvent.click(statusFilterSelect);

    const deadOption = await screen.findByTestId(`select-option Dead`);
    await userEvent.click(deadOption);

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    const charactersCards = queries.charactersItems();

    charactersCards.forEach((card) => {
      const { queryByText, getByText } = within(card);

      expect(queryByText(/alive/i)).not.toBeInTheDocument();
      expect(getByText(/dead/i)).toBeInTheDocument();
    });
  });

  it('renders empty message', async () => {
    server.use(MOCKS_OVERRIDES.characters.getCharacters(() => []));
    renderWithProviders();
    expect(await screen.findByText(/Nothing here to show/i)).toBeInTheDocument();
  });

  it('renders error message', async () => {
    server.use(
      MOCKS_OVERRIDES.characters.getCharacters(() => {
        throw new Error();
      }),
    );
    renderWithProviders();
    expect(await screen.findByText(/error happened/i)).toBeInTheDocument();
  });
});

const renderWithProviders = () => {
  const router = createRouter({
    initialEntries: [appRoutes.charactersPage],
  });
  render(<RouterProvider router={router} />);
};

const queries = {
  charactersContainer: () =>
    screen.getByRole('list', {
      name: /characters/i,
    }),
  charactersItems() {
    return within(this.charactersContainer()).getAllByRole('listitem');
  },
};
