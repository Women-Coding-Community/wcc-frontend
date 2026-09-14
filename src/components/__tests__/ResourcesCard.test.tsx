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
    link: '#',
  };

  it('renders the title, description, button, and image', () => {
    render(<ResourcesCard {...props} />);

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Click Me' })).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src');
    expect(img.getAttribute('src')).toContain(encodeURIComponent('/test.jpg'));
  });

  it('renders correctly when image is an object', () => {
    const propsWithObjImage = {
      ...props,
      image: {
        path: '/test-obj.jpg',
        alt: 'Custom Alt Text',
        type: 'desktop',
      },
    };
    render(<ResourcesCard {...propsWithObjImage} />);

    const img = screen.getByAltText('Custom Alt Text');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toContain(
      encodeURIComponent('/test-obj.jpg'),
    );
  });
});
