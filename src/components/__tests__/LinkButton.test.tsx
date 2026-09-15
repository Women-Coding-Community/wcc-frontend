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
    renderWithTheme(
      <LinkButton href="https://external.com">External Link</LinkButton>,
    );
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

  it('renders an outlined internal link', () => {
    renderWithTheme(
      <LinkButton href="/internal" outlined>
        Outlined Internal
      </LinkButton>,
    );
    const link = screen.getByRole('link', { name: /outlined internal/i });
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/internal');
  });

  it('renders a small outlined button', () => {
    renderWithTheme(
      <LinkButton href="/internal" outlined small>
        Small Outlined
      </LinkButton>,
    );
    const link = screen.getByRole('link', { name: /small outlined/i });
    expect(link).toBeInTheDocument();
  });

  it('renders a small reversed button', () => {
    renderWithTheme(
      <LinkButton href="/internal" reversed small>
        Small Reversed
      </LinkButton>,
    );
    const link = screen.getByRole('link', { name: /small reversed/i });
    expect(link).toBeInTheDocument();
  });

  it('renders a disabled button when disabled is true', () => {
    renderWithTheme(
      <LinkButton href="/disabled" disabled data-testid="disabled-btn">
        Disabled Action
      </LinkButton>,
    );
    const button = screen.getByTestId('disabled-btn');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button.tagName.toLowerCase()).toBe('button');
  });

  it('forwards data-testid to link elements', () => {
    renderWithTheme(
      <LinkButton href="/test-path" data-testid="custom-test-id">
        Test ID Link
      </LinkButton>,
    );
    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });
});
