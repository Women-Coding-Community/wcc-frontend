import { render, screen } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import React from 'react';

import { MentorBanner } from '../MentorBanner';

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

const BannerProps = {
  title: 'Banner Title',
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
  link: { title: 'link title', uri: 'www.google.com', label: 'link label' },
};

describe('MentorBanner', () => {
  describe('Section', () => {
    beforeEach(() => {
      render(<MentorBanner {...BannerProps} />);
    });

    it('returns the title of the banner', () => {
      const name = screen.getByText('Banner Title');
      expect(name).toBeInTheDocument();
    });

    it('returns the correct link with text', () => {
      const link = screen.getByRole('link');
      const linkTitle = screen.getByText('link title');

      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe('www.google.com');
      expect(linkTitle).toBeInTheDocument();
    });
  });

  describe('Banner Image', () => {
    it('returns alt text for mobile', () => {
      window.matchMedia = createMatchMedia(300);
      render(<MentorBanner {...BannerProps} />);

      const bannerSection = screen.getByTestId('mentor-banner');
      expect(bannerSection.getAttribute('aria-label')).toBe('alt mobile text');
    });

    it('returns alt text for desktop', () => {
      window.matchMedia = createMatchMedia(800);
      render(<MentorBanner {...BannerProps} />);
      const bannerSection = screen.getByTestId('mentor-banner');
      expect(bannerSection.getAttribute('aria-label')).toBe('alt desktop text');
    });
  });
});
