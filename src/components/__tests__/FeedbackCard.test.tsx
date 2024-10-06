import { cleanup, render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';

import { FeedbackCard } from '@components';

jest.mock('../../public/icons/quote-icon-custom_orange.svg', () => {
  const MockedQuoteIcon = () => <div data-testid="quote-icon" />;
  MockedQuoteIcon.displayName = 'QuoteIcon';
  return MockedQuoteIcon;
});

const feedbackCardProps: ComponentProps<typeof FeedbackCard> = {
  name: 'Lucy',
  feedback:
    'It is great to be able to share my experience as a newbie in Tech with someone that has more years and experience in the industry. It has definitely made me feel more comfortable with been a completely beginner again and confident that, if a put the hours in, one day it will be pay off.',
  mentee: true,
  year: 2024,
};

describe('FeedbackCard', () => {
  beforeEach(() => {
    render(<FeedbackCard {...feedbackCardProps} />);
  });
  afterEach(() => {
    cleanup();
  });

  it('has a quotes icon', () => {
    const quotes = screen.getByTestId('quote-icon');
    expect(quotes).toBeInTheDocument();
  });

  it('has a feedback content', () => {
    expect(screen.getByText(feedbackCardProps.feedback)).toBeInTheDocument();
  });

  it('has a name', () => {
    expect(screen.getByText(/Lucy/i)).toBeInTheDocument();
  });

  it('if mentee is true displays "Mentee"', () => {
    expect(screen.getByText(/Mentee/i)).toBeInTheDocument();
  });

  it('if mentee is false displays "Mentor"', () => {
    cleanup();
    render(<FeedbackCard name="" feedback={''} mentee={false} year={2024} />);

    expect(screen.getByText(/Mentor/i)).toBeInTheDocument();
  });

  it('has the year when it was created', () => {
    expect(screen.getByText(/2024/i)).toBeInTheDocument();
  });
});
