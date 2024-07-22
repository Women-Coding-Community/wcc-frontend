import { render, screen } from '@testing-library/react';

import { OpportunitiesProgrammes } from 'components/OpportunitiesProgrammes';

describe('OpportunitiesProgrammes', () => {
  const content = {
    title: 'test',
    description: 'test description',
    programmes: [
      { name: 'section1', link: '/section1', icon: 'diversity_2' },
      { name: 'section2', link: '/section2', icon: 'diversity_2' },
    ],
  };
  beforeEach(() => {
    render(<OpportunitiesProgrammes content={content} />);
  });

  it('has a title', () => {
    const title = screen.getByText(content.title);
    expect(title).toBeInTheDocument();
  });

  it('has a description', () => {
    const description = screen.getByText(content.description);
    expect(description).toBeInTheDocument();
  });

  it('has a programmes', () => {
    const programmes = content.programmes;
    programmes.forEach((programme) => {
      const link = screen.getByRole('link', { name: programme.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', programme.link);

      const iconSpan = link.querySelector('span');
      expect(iconSpan?.textContent).toBe(programme.icon);
    });
  });
});
