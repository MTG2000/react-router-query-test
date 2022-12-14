import { render, screen } from '@/utils/tests.utils';
import CharactersFilters from '../CharactersFilters';
import { CharactersFiltersProvider } from '../CharactersFiltersContext';
import userEvent from '@testing-library/user-event';

describe('Characters Filters', () => {
  it('Renders correctly', () => {
    renderWithProviders();

    const statusSelect = queries.statusSelect();
    const genderSelect = queries.genderSelect();

    expect(statusSelect).toBeInTheDocument();
    expect(genderSelect).toBeInTheDocument();
  });

  it('Changes values correctly', async () => {
    renderWithProviders();

    const statusSelect = queries.statusSelect();
    const genderSelect = queries.genderSelect();

    userEvent.click(statusSelect);

    const aliveOption = await screen.findByTestId(`select-option Alive`);
    await userEvent.click(aliveOption);

    userEvent.click(genderSelect);

    const maleOption = await screen.findByTestId(`select-option Male`);
    await userEvent.click(maleOption);

    expect(screen.getByText(/alive/i)).toBeInTheDocument();

    expect(screen.getByText(/male/i)).toBeInTheDocument();
  });
});

const renderWithProviders = () =>
  render(
    <CharactersFiltersProvider>
      <CharactersFilters />
    </CharactersFiltersProvider>,
  );

const queries = {
  statusSelect: () => screen.getByLabelText(/status/i),
  genderSelect: () => screen.getByLabelText(/gender/i),
};
