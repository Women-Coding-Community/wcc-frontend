import { render, screen } from '@testing-library/react';
import React from 'react';

import { HeroWithImage } from '@components';

describe('HeroWithImage', () => {
  const title = 'Study Groups';
  const imageSrc = '/hero-img.jpg';

  it('renders the title correctly', () => {
    render(<HeroWithImage title={title} imageSrc={imageSrc} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders the image with correct src and alt', () => {
    render(<HeroWithImage title={title} imageSrc={imageSrc} />);

    const image = screen.getByAltText('Study Groups') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(imageSrc);
  });
});
