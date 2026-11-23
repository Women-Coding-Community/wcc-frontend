import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { FooterResponse } from '@utils/types';
import theme from 'theme';

import { Footer } from '../Footer';

describe('Footer Component', () => {
  const mockData: FooterResponse = {
    title: 'Connect with Us',
    subtitle: 'Follow us on our social media channels',
    description:
      'Women Coding Community is a not-for-profit organisation. © 2024 Women Coding Community',
    network: [
      { type: 'github', link: 'https://github.com' },
      { type: 'linkedin', link: 'https://linkedin.com' },
    ],
    link: {
      title: 'Visit Our Website',
      label: 'womencommunity.com',
      uri: 'https://womencommunity.com',
    },
    partners: {
      title: 'Community Partners',
      items: [
        {
          name: 'SurrealDB',
          image: {
            path: 'https://example.com/surrealdb.png',
            alt: 'SurrealDB logo',
            type: 'desktop',
          },
          link: {
            label: 'Visit SurrealDB',
            uri: 'https://surrealdb.com/',
          },
        },
      ],
    },
  };

  const renderComponent = () => {
    return render(
      <ThemeProvider theme={theme}>
        <Footer {...mockData} />
      </ThemeProvider>,
    );
  };

  it('renders title and subtitle', () => {
    renderComponent();

    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(mockData.subtitle)).toBeInTheDocument();
  });

  it('renders community partners', () => {
    renderComponent();

    expect(screen.getByText('Community Partners:')).toBeInTheDocument();
    expect(screen.getByAltText('SurrealDB logo')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /visit surrealdb/i }),
    ).toHaveAttribute('href', 'https://surrealdb.com/');
  });

  it('renders the description with a line break', () => {
    renderComponent();

    expect(
      screen.getByText(
        /Women Coding Community is a not-for-profit organisation./,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`© ${new Date().getFullYear()} Women Coding Community`),
      ),
    ).toBeInTheDocument();
  });

  it.skip('renders social media icons with correct links', () => {
    renderComponent();

    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedInLink = screen.getByRole('link', { name: /linkedin/i });

    expect(githubLink).toHaveAttribute('href', mockData.network[0].link);
    expect(linkedInLink).toHaveAttribute('href', mockData.network[1].link);
  });

  it.skip('renders the website link correctly', () => {
    renderComponent();

    const linkElement = screen.getByText(mockData.link.label);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', mockData.link.uri);
  });
});
