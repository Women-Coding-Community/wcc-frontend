import { render, screen } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';
import { LandingPageResponse } from '../../utils/types';
import { Hero } from '../Hero';

const mockImages: LandingPageResponse['heroSection']['images'] = [
  {
    alt: 'Test Image',
    path: '/test-image.jpg',
    type: '',
  },
];

describe('Hero Component', () => {
  it('renders the title', () => {
    render(
      <Hero
        title="Test Title"
        description="Test Description"
        images={mockImages}
      />,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(
      <Hero
        title="Test Title"
        description="Test Description"
        images={mockImages}
      />,
    );
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders the image with correct src and alt attributes', () => {
    render(
      <Hero
        title="Test Title"
        description="Test Description"
        images={mockImages}
      />,
    );
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Image');
  });

  it('renders the GradientBorderDivider', () => {
    render(
      <Hero
        title="Test Title"
        description="Test Description"
        images={mockImages}
      />,
    );
    expect(screen.getByTestId('gradient-border-divider')).toBeInTheDocument();
  });

  it('applies correct styles based on screen size', () => {
    render(
      <Hero
        title="Test Title"
        description="Test Description"
        images={mockImages}
      />,
    );
    const gridContainer = screen.getByTestId('grid-container');
    expect(gridContainer).toHaveStyle('max-width: 100%');
  });
});
