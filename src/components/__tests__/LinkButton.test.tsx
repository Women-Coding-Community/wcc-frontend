import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';

import theme from 'theme';

import { LinkButton } from '../LinkButton';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('LinkButton', () => {
  it('renders an internal link using Next.js Link', () => {
    renderWithTheme(<LinkButton href="/internal">Internal Link</LinkButton>);
    const button = screen.getByRole('link', { name: /internal link/i });
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/internal');
    // opens internal links without a new tab
    expect(button.closest('a')).not.toHaveAttribute('target', '_blank');
  });

  it('renders an external link with target _blank', () => {
    render(<LinkButton href="https://external.com">External Link</LinkButton>);
    const button = screen.getByRole('link', { name: /external link/i });
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', 'https://external.com');
    // opens external links in a new tab
    expect(button.closest('a')).toHaveAttribute('target', '_blank');
    expect(button.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders an outlined external link', () => {
    renderWithTheme(
      <LinkButton href="https://external.com" outlined>
        Outlined External
      </LinkButton>,
    );
    const link = screen.getByRole('link', { name: /outlined external/i });
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://external.com');
  });
});
