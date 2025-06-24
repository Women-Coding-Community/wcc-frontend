import { render, screen } from '@testing-library/react';

import { MentorshipCodeOfConductData } from '@utils/types';
import MentorshipCodeOfConductPage from 'pages/mentorship/code-of-conduct';

describe('MentorshipCodeOfConduct', () => {
  const mentorshipCodeOfConduct: MentorshipCodeOfConductData = {
    heroSection: { title: 'Mentorship Code Of Conduct' },
    id: '123',
    menteeCodeSection: {
      items: ['women coding community is an inclusive community'],
      title: 'code of conduct for mentees',
    },
    mentorCodeSection: {
      items: ['Cancel or reschedule appointments with a minimum of 24'],
      title: 'code of conduct for mentors',
    },
    wccCodeSection: {
      link: {
        label: 'WCC Code of Conduct',
        uri: '/code-of-conduct',
      },
    },
  };

  beforeEach(() => {
    render(
      <MentorshipCodeOfConductPage
        mentorshipCodeOfConduct={mentorshipCodeOfConduct}
      />,
    );
  });

  it('renders main title', () => {
    expect(screen.getByText(/mentorship code of conduct/i)).toBeInTheDocument();
  });

  it('renders mentees section', () => {
    expect(
      screen.getByText(/code of conduct for mentees/i),
    ).toBeInTheDocument();
  });

  it('renders mentors section', () => {
    expect(
      screen.getByText(/code of conduct for mentors/i),
    ).toBeInTheDocument();
  });

  it('renders at least one rule for mentees', () => {
    expect(
      screen.getByText(/women coding community is an inclusive community/i),
    ).toBeInTheDocument();
  });
  it('renders at least one rule for mentors', () => {
    expect(
      screen.getByText(
        /Cancel or reschedule appointments with a minimum of 24/i,
      ),
    ).toBeInTheDocument();
  });

  it('shows two "Show more" buttons', () => {
    const buttons = screen.getAllByText(/show more/i);
    expect(buttons.length).toBe(2);
  });
});
