import { render, screen } from '@testing-library/react';
import React from 'react';

import { Partner } from '@utils/types';

import { CommunityPartners } from '../CommunityPartners';

const partners: Partner[] = [
  {
    name: 'SurrealDB',
    image: {
      path: 'https://drive.google.com/file/d/1sxYKgOSzql2sFX9FLnEHAQhmskOHwBzI/view',
      alt: 'SurrealDB logo',
      type: 'desktop',
    },
    link: {
      label: 'Visit SurrealDB',
      uri: 'https://surrealdb.com/',
    },
  },
  {
    name: 'Amazon',
    image: {
      path: 'https://example.com/amazon.png',
      alt: 'Amazon logo',
      type: 'desktop',
    },
    link: {
      label: 'Visit Amazon',
      uri: 'https://www.amazon.com/',
    },
  },
];

describe('CommunityPartners Component', () => {
  it('renders the partner logos and links', () => {
    render(<CommunityPartners partners={partners} />);

    expect(screen.getByText('Community Partners:')).toBeInTheDocument();
    expect(screen.getByAltText('SurrealDB logo')).toBeInTheDocument();
    expect(screen.getByAltText('Amazon logo')).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Visit SurrealDB' }),
    ).toHaveAttribute('href', 'https://surrealdb.com/');
    expect(screen.getByRole('link', { name: 'Visit Amazon' })).toHaveAttribute(
      'href',
      'https://www.amazon.com/',
    );
  });

  it('converts Google Drive file links to direct download links', () => {
    render(<CommunityPartners partners={partners} />);

    const src = screen.getByAltText('SurrealDB logo').getAttribute('src') ?? '';

    expect(decodeURIComponent(src)).toContain(
      'https://drive.google.com/uc?id=1sxYKgOSzql2sFX9FLnEHAQhmskOHwBzI&export=download',
    );
  });

  it('renders nothing when there are no partners', () => {
    const { container } = render(<CommunityPartners partners={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when partners are null', () => {
    const { container } = render(<CommunityPartners partners={null} />);

    expect(container).toBeEmptyDOMElement();
  });
});
