import { render, screen } from '@testing-library/react';
import React from 'react';

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

  it('returns the correct link with text', () => {
    const link = screen.getByRole('link');
    const linkTitle = screen.getByText('This will link to another page');

    expect(linkTitle).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/about-us/volunteer');
  });
});

describe('Volunteer Image', () => {
  it('returns alt text for desktop', async () => {
    const volunteerImage = await screen.findByTestId('image-section');
    expect(volunteerImage.getAttribute('alt')).toBe('alt desktop text');
  });
});
