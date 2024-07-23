import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';

import theme from 'theme';

import { Tile } from '../Tile';

describe('Tile', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Tile name="Section" icon="diversity_2" link="google.com" />
      </ThemeProvider>,
    );
  });

  it('has a link to the specified path', () => {
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('google.com');
  });

  it('has the correct icon', () => {
    const icon = screen.getByText('diversity_2');
    expect(icon).toHaveClass('material-symbols-outlined');
  });

  it('has the correct name', () => {
    const name = screen.getByText('Section');
    expect(name).toBeInTheDocument();
  });
});
