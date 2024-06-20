import { render, screen } from '@testing-library/react';

import Tile from '../Tile';

describe('Tile', () => {
  beforeEach(() => {
    render(<Tile name="Section" icon="diversity_2" link="google.com"></Tile>);
  });

  it('has a link to the specified path', () => {
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('google.com');
  });

  it('has the correct icon', () => {
    const icon = screen.getByText('diversity_2');
    expect(icon).toHaveClass('material-symbols-outlined');

    // Ideally test to see if the font is applied, rather than class name
    // The font family is not applied in this test because the Google Fonts stylesheet is not loaded
    // expect(icon).toHaveStyle('font-family: "Material Symbol Outlined"');
  });
  it('has the correct name', () => {
    const name = screen.getByText('Section');
    expect(name).toBeInTheDocument();
  });
});
