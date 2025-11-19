import { render, screen } from '@testing-library/react';
import React from 'react';

import { StudyGroupsInfoBlock } from '@components';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

jest.mock('../ContactBox', () => ({
  ContactBox: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="contact-box-mock">{children}</div>
  ),
}));

describe('StudyGroupsInfoBlock', () => {
  const mockIntroText = 'test intro text.';

  it('renders the main title and intro text correctly', () => {
    render(
      <StudyGroupsInfoBlock introText={mockIntroText} contactLinks={[]} />,
    );
    expect(
      screen.getByRole('heading', { level: 2, name: /how it works/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(mockIntroText)).toBeInTheDocument();
  });
  it('renders the slack link correctly when provided', () => {
    const mockLinks = [
      { type: 'email', link: 'mailto:noise@test.com' },
      { type: 'slack', link: 'https://join.slack.com/t/myworkspace' },
      { type: 'twitter', link: 'https://twitter.com' },
    ];

    render(
      <StudyGroupsInfoBlock
        introText={mockIntroText}
        contactLinks={mockLinks}
      />,
    );

    const linkElement = screen.getByRole('link', {
      name: /join us in our study group slack channel/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      'href',
      'https://join.slack.com/t/myworkspace',
    );
  });
  it('falls back to "#" href when no slack link is present', () => {
    const mockLinks = [{ type: 'email', link: 'mailto:test@test.com' }];

    render(
      <StudyGroupsInfoBlock
        introText={mockIntroText}
        contactLinks={mockLinks}
      />,
    );

    const linkElement = screen.getByRole('link', {
      name: /join us in our study group slack channel/i,
    });
    expect(linkElement).toHaveAttribute('href', '#');
  });

  it('renders the Slack icon with correct alt text', () => {
    render(
      <StudyGroupsInfoBlock introText={mockIntroText} contactLinks={[]} />,
    );

    const image = screen.getByAltText('Slack Icon');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('icon_slack_hash_colored.png'),
    );
  });
});
