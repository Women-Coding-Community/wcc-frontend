import React from 'react';
import { render, screen } from '@testing-library/react';
import { StudyGroupsHero } from '../StudyGroupHero';

describe('StudyGroupsHero', () => {
  const title = 'Technical Study Groups';
  const imageSrc = '/hero-img.jpg';

  it('renders the title correctly', () => {
    render(<StudyGroupsHero title={title} imageSrc={imageSrc} />);

    const firstWord = title.split(' ')[0];
    const rest = title.split(' ').slice(1).join(' ');

    expect(screen.getByText(firstWord)).toBeInTheDocument();
    expect(screen.getByText(rest)).toBeInTheDocument();
  });

  it('renders the image with correct src and alt', () => {
    render(<StudyGroupsHero title={title} imageSrc={imageSrc} />);

    const image = screen.getByAltText('Study Groups') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(imageSrc);
  });
});
