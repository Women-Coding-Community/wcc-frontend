import { render, screen } from '@testing-library/react';
import React from 'react';
import Image from 'next/image';
import { VolunteerSection } from '../VolunteerSection';

describe('VolunteerSection', () => {
  const VolunteerProps = {
    title: 'Do you want to volunteer',
    description: 'This will be a description',
    link: {
      title: 'This will link to another page',
      uri: '/about-us/volunteer',
    },
    images: [
      {
        path: '/desktop.jpg',
        alt: 'alt desktop text',
        type: 'desktop',
      },
    ],
  };

  beforeEach(() => {
    render(<VolunteerSection {...VolunteerProps} />);
  });

  it('returns the title of the Volunteer', () => {
    const title = screen.getByText('Do you want to volunteer');
    expect(title).toBeInTheDocument();
  });

  it('returns the correct link with text and href', () => {
    const link = screen.getByRole('link');
    const linkTitle = screen.getByText('This will link to another page');

    expect(linkTitle).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about-us/volunteer');
  });
});

describe('Volunteer Image', () => {
  it('returns alt text for desktop', () => {
    const testProps = {
      src: 'https://drive.google.com/uc?id=1fWzte4q2adiMf7MFAjMRlNDbccZVs7iL&export=download',
      alt: 'some alt',
      width: 634,
      height: 493,
    };
    render(<Image {...testProps} />);
    const imageAltNode = screen.getByAltText(testProps.alt);

    expect(imageAltNode).toBeInTheDocument();
  });
});
