import { render, screen } from '@testing-library/react';

import MentorshipResourcesPage from 'pages/mentorship/resources';

jest.mock('components/ResourcesHero', () => {
  const ResourcesHero = () => <div>Hero</div>;
  ResourcesHero.displayName = 'ResourcesHero';
  return ResourcesHero;
});

jest.mock('components/ResourcesCard', () => {
  const ResourcesCard = () => <div>Card</div>;
  ResourcesCard.displayName = 'ResourcesCard';
  return { ResourcesCard };
});

jest.mock('components/Footer', () => {
  const Footer = () => <div>Footer</div>;
  Footer.displayName = 'Footer';
  return { Footer };
});

test('renders hero, cards, and footer', () => {
  render(<MentorshipResourcesPage />);

  expect(screen.getByText('Hero')).toBeInTheDocument();
  expect(screen.getAllByText('Card').length).toBe(3);
  expect(screen.getByText('Footer')).toBeInTheDocument();
});
