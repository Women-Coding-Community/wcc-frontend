import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';

import theme from 'theme';

import { TeamMemberCard, TeamMemberCardProps } from '../TeamMemberCard';

const member: TeamMemberCardProps = {
  fullName: 'Abhipsa Mishra',
  position: 'WCC Director',
  jobTitle: 'Senior Software Engineer',
  images: [{ path: '/abhipsa.jpg', alt: 'Abhipsa Mishra', type: 'desktop' }],
  network: [
    { type: 'linkedin', link: 'https://www.linkedin.com/in/abhipsa' },
    { type: 'github', link: 'https://github.com/abhipsa' },
    { type: 'twitter', link: 'https://x.com/abhipsa' },
  ],
};

const renderCard = (props: TeamMemberCardProps = member) =>
  render(
    <ThemeProvider theme={theme}>
      <TeamMemberCard {...props} />
    </ThemeProvider>,
  );

describe('TeamMemberCard', () => {
  it('renders the profile, community position and job title separately', () => {
    renderCard();

    expect(
      screen.getByRole('heading', { name: member.fullName }),
    ).toBeInTheDocument();
    expect(screen.getByText(member.position)).toBeInTheDocument();
    expect(screen.getByText(member.jobTitle)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: member.fullName })).toHaveAttribute(
      'src',
      expect.stringContaining(encodeURIComponent('/abhipsa.jpg')),
    );
  });

  it('provides named social links that open the matching profiles safely', () => {
    renderCard();

    expect(screen.getAllByRole('link')).toHaveLength(3);
    ['LinkedIn', 'GitHub', 'X'].forEach((label, index) => {
      const link = screen.getByRole('link', {
        name: `${member.fullName} on ${label}`,
      });
      expect(link).toHaveAttribute('href', member.network![index].link);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('keeps links for additional networks and handles mixed-case types', () => {
    renderCard({
      ...member,
      network: [
        { type: 'LinkedIn', link: 'https://www.linkedin.com/in/abhipsa' },
        { type: 'medium', link: 'https://medium.com/@abhipsa' },
      ],
    });

    expect(
      screen.getByRole('link', { name: 'Abhipsa Mishra on LinkedIn' }),
    ).toHaveAttribute('href', 'https://www.linkedin.com/in/abhipsa');
    expect(
      screen.getByRole('link', { name: 'Abhipsa Mishra on medium' }),
    ).toHaveAttribute('href', 'https://medium.com/@abhipsa');
  });

  it.each([undefined, []])(
    'renders a placeholder without optional photos (%j) or social networks',
    (images) => {
      renderCard({ ...member, images, network: undefined });

      expect(
        screen.getByRole('img', {
          name: 'Profile illustration for Abhipsa Mishra',
        }),
      ).toHaveAttribute(
        'src',
        expect.stringContaining(
          encodeURIComponent('/profile-illustration-female-fallback.jpg'),
        ),
      );
      expect(screen.queryByAltText(member.fullName)).not.toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    },
  );

  it('falls back after a photo error and can display a new photo', () => {
    const { rerender } = renderCard();

    fireEvent.error(screen.getByRole('img'));
    expect(
      screen.getByRole('img', {
        name: 'Profile illustration for Abhipsa Mishra',
      }),
    ).toHaveAttribute(
      'src',
      expect.stringContaining(
        encodeURIComponent('/profile-illustration-female-fallback.jpg'),
      ),
    );
    expect(screen.queryByAltText(member.fullName)).not.toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <TeamMemberCard
          {...member}
          images={[
            { path: '/new-photo.jpg', alt: member.fullName, type: 'desktop' },
          ]}
        />
      </ThemeProvider>,
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining(encodeURIComponent('/new-photo.jpg')),
    );
  });
});
