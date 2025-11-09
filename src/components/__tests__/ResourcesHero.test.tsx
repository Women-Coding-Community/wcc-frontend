import { render, screen } from '@testing-library/react';

import ResourcesHero from '../ResourcesHero';

test('renders hero title and paragraph', () => {
  const title = 'Mentorship Resources';
  const description =
    "Whether you're a mentee looking to navigate your journey, a mentor aiming to provide the best guidance, or a seasoned mentor seeking quick tips, we have the tools you need. Explore our guides for insightful mentorship advice and strategies.";

  render(<ResourcesHero title={title} description={description} />);

  expect(
    screen.getByRole('heading', { name: /mentorship resources/i }),
  ).toBeInTheDocument();

  expect(
    screen.getByText(/whether you're a mentee looking/i),
  ).toBeInTheDocument();
});
