import { render, screen } from '@testing-library/react';
import React from 'react';

import { HeroWithImage } from '@components';

describe('HeroWithImage', () => {
  const title = 'Study Groups';
  const imageSrc = '/hero-img.jpg';

  it('renders the title correctly', () => {
    render(<HeroWithImage title={title} image={imageSrc} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders the image with correct src and alt', () => {
    render(<HeroWithImage title={title} image={imageSrc} />);

    const image = screen.getByAltText('Study Groups') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(imageSrc);
  });

  it('renders the image when passed an Image object', () => {
    const imageObj = {
      path: '/custom-hero.jpg',
      alt: 'Custom Alt Text',
      type: 'desktop',
    };
    render(<HeroWithImage title={title} image={imageObj} />);

    const image = screen.getByAltText('Custom Alt Text') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('/custom-hero.jpg');
  });
});
