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

  it('normalizes Google Drive file preview URLs for the image source', () => {
    render(
      <ResourcesCard
        {...props}
        image="https://drive.google.com/file/d/1AQKAp76gjk1kMX7pB7pnY5G5TMnxmDVk"
      />,
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      'https://drive.google.com/thumbnail?id=1AQKAp76gjk1kMX7pB7pnY5G5TMnxmDVk&sz=w1000',
    );
  });

  it('normalizes Google Drive download URLs for the image source', () => {
    render(
      <ResourcesCard
        {...props}
        image="https://drive.google.com/uc?id=1AQKAp76gjk1kMX7pB7pnY5G5TMnxmDVk&export=download"
      />,
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      'https://drive.google.com/thumbnail?id=1AQKAp76gjk1kMX7pB7pnY5G5TMnxmDVk&sz=w1000',
    );
  });
});
