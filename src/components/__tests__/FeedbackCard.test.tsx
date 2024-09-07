import { render, screen } from '@testing-library/react';

import { FeedbackCard } from 'components/FeedbackCard';

describe('FeedbackCard', () => {
  beforeEach(() => {
    render(<FeedbackCard name={''} feedback={''} mentee={false} year={0} />);
  });

  it('has a quotes', () => {
    const quotes = screen.getByText('“');
    expect(quotes).toBeInTheDocument();
  });

  it('has a feedback content', () => {
    const feedbackText = 'This was a great experience!';
    render(
      <FeedbackCard
        name="Jane"
        feedback={feedbackText}
        mentee={false}
        year={2020}
      />,
    );
    expect(screen.getByText(feedbackText)).toBeInTheDocument();
  });

  it('has a name', () => {});

  it('is mentee or mentor', () => {});

  it('has the year when it was created', () => {});
});
