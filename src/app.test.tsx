import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);

    const logo = screen.getByText(/Router \+ Query \+ Rick & Morty/i);
    expect(logo).toBeInTheDocument();
  });
});
