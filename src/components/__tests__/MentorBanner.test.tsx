import { render, screen } from '@testing-library/react';
import React from 'react';

import { MentorBanner } from '../MentorBanner';

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
  ],
  link: { title: 'link title', uri: 'www.google.com', label: 'link label' },
};

describe('MentorBanner', () => {
  beforeEach(() => {
    render(<MentorBanner {...BannerProps} />);
  });

  it('returns the title of the banner', () => {
    const name = screen.getByText('Banner Title');
    expect(name).toBeInTheDocument();
  });

  // it('returns image for mobile', () => {
  //   window.innerWidth = 600;

  //   const bannerSection = screen.getByTestId('mentor-banner');
  //   expect(bannerSection.getAttribute('aria-label')).toBe('alt mobile text');
  //  // const getStyle = window.getComputedStyle(bannerSection);
  // //  expect(getStyle).toContain('mobile.jpg');
  // });

  // it('returns image for desktop', () => {
  //   window.innerWidth = 900;

  //   const bannerSection = screen.getByTestId('mentor-banner');
  //   expect(bannerSection.getAttribute('aria-label')).toBe('alt desktop text');

  // //  const getStyle = window.getComputedStyle(bannerSection);
  // //  expect(getStyle).toContain('desktop.jpg');
  // });

  it('returns the correct link with text', () => {
    const link = screen.getByRole('link');
    const linkTitle = screen.getByText('link title');

    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('www.google.com');
    expect(linkTitle).toBeInTheDocument();
  });
});
