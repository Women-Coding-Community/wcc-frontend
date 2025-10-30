import { render, screen } from '@testing-library/react';

import ResourcesHero from '../ResourcesHero';

test('renders hero title and paragraph', () => {
  render(<ResourcesHero />);

  expect(
    screen.getByRole('heading', { name: /mentorship resources/i }),
  ).toBeInTheDocument();

  expect(
    screen.getByText(/whether you're a mentee looking/i),
  ).toBeInTheDocument();
});
