import { render, screen } from '@testing-library/react';

import { FeedbackCard } from 'components/FeedbackCard';

describe('FeedbackCard', () => {
  // Does this variable make sense?
  let firstRender: any;
  beforeEach(() => {
    firstRender = render(
      <FeedbackCard
        name="Lucy"
        feedback={
          'It is great to be able to share my experience as a newbie in Tech with someone that has more years and experience in the industry. It has definitely made me feel more comfortable with been a completely beginner again and confident that, if a put the hours in, one day it will be pay off.'
        }
        mentee={true}
        year={2024}
      />,
    );
  });

  it('has a quotes', () => {
    const quotes = screen.getByText('“');
    expect(quotes).toBeInTheDocument();
  });

  it('has a feedback content', () => {
    expect(
      screen.getByText(
        'It is great to be able to share my experience as a newbie in Tech with someone that has more years and experience in the industry. It has definitely made me feel more comfortable with been a completely beginner again and confident that, if a put the hours in, one day it will be pay off.',
      ),
    ).toBeInTheDocument();
  });

  it('has a name', () => {
    expect(screen.getByText(/Lucy/i)).toBeInTheDocument();
  });

  it('if mentee is true displays "Mentee"', () => {
    expect(screen.getByText(/Mentee/i)).toBeInTheDocument();
  });

  it('if mentee is false displays "Mentor"', () => {
    // Using the rerender method for when mentee is true and false
    const { rerender } = firstRender;
    rerender(<FeedbackCard name="" feedback={''} mentee={false} year={2024} />);
    expect(screen.getByText(/Mentor/i)).toBeInTheDocument();
  });

  it('has the year when it was created', () => {
    expect(screen.getByText(/2024/i)).toBeInTheDocument();
  });
});
