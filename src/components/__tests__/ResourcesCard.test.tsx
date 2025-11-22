import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ResourcesCard } from '../ResourcesCard'; // adjust path if needed

describe('ResourcesCard', () => {
  const props = {
    image: '/test.jpg',
    title: 'Test Card',
    description: 'This is a test description',
    buttonText: 'Click Me',
    link: '#',
  };

  it('renders the title, description, button, and image', () => {
    render(<ResourcesCard {...props} />);

    // Title and description
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();

    // Button (link)
    expect(screen.getByRole('link', { name: 'Click Me' })).toBeInTheDocument();

    // Image
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/test.jpg');
    // Optionally check alt text if your component sets it
    // expect(img).toHaveAttribute('alt', 'Test Card');
  });
});
