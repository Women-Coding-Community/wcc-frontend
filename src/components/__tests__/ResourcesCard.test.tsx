import { render, screen } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';
import { ResourcesCard } from '../ResourcesCard'; // adjust path if needed

describe('ResourcesCard', () => {
  const props = {
    image: '/test.jpg',
    title: 'Test Card',
    description: 'This is a test description',
    buttonText: 'Click Me',
    link: 'https://drive.google.com/file/d/1xPbW8BlQoLXkuAJ7m0RuvOV02Opyr445',
  };

  it('renders the title, description, button, link, and image', () => {
    render(<ResourcesCard {...props} />);

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Click Me' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      'https://drive.google.com/file/d/1xPbW8BlQoLXkuAJ7m0RuvOV02Opyr445',
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/test.jpg');
  });
});
