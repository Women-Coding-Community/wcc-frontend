import { render, screen } from '@testing-library/react';

import { OpportunitiesProgrammes } from 'components/OpportunitiesProgrammes';

describe('OpportunitiesProgrammes', () => {
  const content = {
    title: 'test',
    description: 'test description',
    items: [
      {
        name: 'section1',
        link: { uri: '/section1', label: '/section1' },
        icon: 'diversity_2',
      },
      {
        name: 'section2',
        link: { uri: '/section2', label: '/section2' },
        icon: 'diversity_2',
      },
    ],
  };
  beforeEach(() => {
    render(<OpportunitiesProgrammes {...content} />);
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
    const programmes = content.items;
    programmes.forEach((programme) => {
      const link = screen.getByRole('link', { name: programme.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', programme.link.uri);

      const iconSpan = link.querySelector('span');
      expect(iconSpan?.textContent).toBe(programme.icon);
    });
  });
});
