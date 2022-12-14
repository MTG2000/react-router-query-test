import App from './App';
import { render, screen } from '@/utils/tests.utils';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);

    const logo = screen.getByText(/Router \+ Query \+ Rick & Morty/i);
    expect(logo).toBeInTheDocument();
  });
});
