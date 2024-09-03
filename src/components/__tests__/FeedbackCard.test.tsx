import { render, screen } from '@testing-library/react';

import { FeedbackCard } from 'components/FeedbackCard';

describe('FeedbackCard', () => {
  // const feedbackProps = {

  // }
  beforeEach(() => {
    render(<FeedbackCard name={''} feedback={''} mentee={false} year={0} />);
  });

  it('has a quotes', () => {
    const quotes = screen.getByText('“');
    expect(quotes).toBeInTheDocument();
  });

  it('has a feedback content', () => {
    // const feedbackText = screen.getByText({feedback})
  });
});
