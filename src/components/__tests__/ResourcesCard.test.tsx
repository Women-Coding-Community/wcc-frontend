import { render, screen } from '@testing-library/react';

import { ResourcesCard } from '../ResourcesCard';

test('renders card with title, description, and button', () => {
  const props = {
    image: '/test.jpg',
    title: 'Test Card',
    description: 'This is a test description',
    buttonText: 'Click Me',
    link: '#',
  };

  render(<ResourcesCard {...props} />);

  expect(screen.getByText('Test Card')).toBeInTheDocument();
  expect(screen.getByText('This is a test description')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Click Me' })).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', '/test.jpg');
});
