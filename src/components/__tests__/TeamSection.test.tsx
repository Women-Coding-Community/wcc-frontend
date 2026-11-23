import { ThemeProvider } from '@mui/material';
import { render, screen, within } from '@testing-library/react';

import { TeamMembersData } from '@utils/types';
import theme from 'theme';

import { TeamSection } from '../TeamSection';

const createMember = (fullName: string, jobTitle = 'Software Engineer') => ({
  fullName,
  position: jobTitle,
  email: `${fullName.toLowerCase().replace(' ', '.')}@example.com`,
  country: { countryCode: 'GB', countryName: 'United Kingdom' },
  city: 'London',
  jobTitle,
  companyName: 'WCC',
  images: [],
  network: [],
});

const membersByType: TeamMembersData = {
  directors: [createMember('Ada Lovelace'), createMember('Grace Hopper')],
  leads: [createMember('Katherine Johnson')],
  evangelists: [
    createMember('Radia Perlman'),
    createMember('Margaret Hamilton'),
    createMember('Hedy Lamarr'),
  ],
};

const renderSection = (data: TeamMembersData = membersByType) =>
  render(
    <ThemeProvider theme={theme}>
      <TeamSection membersByType={data} />
    </ThemeProvider>,
  );

describe('TeamSection', () => {
  it('renders the team groups in rank order', () => {
    renderSection();

    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent);

    expect(headings).toEqual(['WCC Directors', 'WCC Leads', 'WCC Evangelists']);
  });

  it.each([
    ['WCC Directors', 'WCC Director', 2],
    ['WCC Leads', 'WCC Lead', 1],
    ['WCC Evangelists', 'WCC Evangelist', 3],
  ])(
    'renders %s with the community position on each card',
    (groupTitle, position, count) => {
      renderSection();

      const group = screen.getByRole('region', { name: groupTitle });
      const cards = within(group).getAllByRole('article');

      expect(cards).toHaveLength(count);
      cards.forEach((card) => {
        expect(within(card).getByText(position)).toBeInTheDocument();
      });
    },
  );

  it('falls back to the position field when the job title is missing', () => {
    renderSection({
      directors: [
        { ...createMember('Ada Lovelace', 'Mathematician'), jobTitle: '' },
      ],
      leads: [],
      evangelists: [],
    });

    expect(screen.getByText('Mathematician')).toBeInTheDocument();
  });

  it('does not render a group heading when the group has no members', () => {
    renderSection({ ...membersByType, leads: [] });

    expect(
      screen.queryByRole('heading', { name: 'WCC Leads' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'WCC Directors' }),
    ).toBeInTheDocument();
  });
});
