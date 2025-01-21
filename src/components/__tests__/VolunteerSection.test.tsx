import { render, screen } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import React from 'react';

import { VolunteerSection } from '../VolunteerSection';

export const createMatchMedia =
  (width: number) =>
  (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    media: query,
    onchange: null,
    addListener: () => jest.fn(),
    removeListener: () => jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });

const VolunteerProps = {
  title: 'Volunteer Title',
  description: 'This is a description',
  images: [
    {
      path: '/desktop.jpg',
      alt: 'alt desktop text',
      type: 'desktop',
    },
    {
      path: '/mobile.jpg',
      alt: 'alt mobile text',
      type: 'mobile',
    },
    {
      path: '/tablet.jpg',
      alt: 'alt tablet text',
      type: 'tablet',
    },
  ],
  link: { uri: 'www.google.com', label: 'link label' },
};

describe('VolunteerSection', () => {
  describe('Section', () => {
    beforeEach(() => {
      render(<VolunteerSection {...VolunteerProps} />);
    });

    it('returns the title of the Volunteer', () => {
      const name = screen.getByText('Volunteer Title');
      expect(name).toBeInTheDocument();
    });

    it('returns the correct link with text', () => {
      const link = screen.getByRole('link');
      const linkLabel = screen.getByText('link label');

      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe('www.google.com');
      expect(linkLabel).toBeInTheDocument();
    });
  });

  describe('Volunteer Image', () => {
    it('returns alt text for mobile', () => {
      window.matchMedia = createMatchMedia(300);
      render(<VolunteerSection {...VolunteerProps} />);

      const volunteerSection = screen.getByTestId('volunteer-section');
      expect(volunteerSection.getAttribute('aria-label')).toBe(
        'alt mobile text',
      );
    });

    it('returns alt text for desktop', () => {
      window.matchMedia = createMatchMedia(800);
      render(<VolunteerSection {...VolunteerProps} />);
      const volunteerSection = screen.getByTestId('volunteer-section');
      expect(volunteerSection.getAttribute('aria-label')).toBe(
        'alt desktop text',
      );
    });
  });
});
