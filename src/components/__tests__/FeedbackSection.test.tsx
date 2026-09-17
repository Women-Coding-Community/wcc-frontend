import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';

import { FeedbackItem } from '@utils/types';

import { FeedbackSection } from '../FeedbackSection';

jest.mock('../../public/icons/quote-icon-custom_orange.svg', () => {
  const MockedQuoteIcon = () => <div data-testid="quote-icon" />;
  MockedQuoteIcon.displayName = 'QuoteIcon';
  return MockedQuoteIcon;
});

const mockFeedbacks: FeedbackItem[] = [
  {
    name: 'Alice',
    feedback: 'Great mentorship experience!',
    memberType: 'Mentee',
    year: 2024,
  },
  {
    name: 'Bob',
    feedback: 'Learned so much from my mentor.',
    memberType: 'Mentee',
    year: 2023,
  },
  {
    name: 'Carol',
    feedback: 'Mentoring was very rewarding.',
    memberType: 'Mentor',
    year: 2024,
  },
  {
    name: 'David',
    feedback: 'Helped me transition to cloud engineering.',
    memberType: 'Mentee',
    year: 2024,
  },
  {
    name: 'Eve',
    feedback: 'Inspiring community and support.',
    memberType: 'Mentor',
    year: 2024,
  },
];

describe('FeedbackSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders section title and initial 3 feedback cards', () => {
    render(
      <FeedbackSection title="Community Feedback" feedbacks={mockFeedbacks} />,
    );

    expect(screen.getByText('Community Feedback')).toBeInTheDocument();
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob/i)).toBeInTheDocument();
    expect(screen.getByText(/Carol/i)).toBeInTheDocument();
    expect(screen.queryByText(/David/i)).not.toBeInTheDocument();
  });

  it('shows more feedbacks when clicking "+ Show more"', () => {
    render(
      <FeedbackSection title="Community Feedback" feedbacks={mockFeedbacks} />,
    );

    const showMoreButton = screen.getByTestId('feedback-show-more');
    expect(showMoreButton).toHaveTextContent('+ Show more');

    fireEvent.click(showMoreButton);

    expect(screen.getByText(/David/i)).toBeInTheDocument();
    expect(screen.getByText(/Eve/i)).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent('- Show less');
  });

  it('collapses feedbacks when clicking "- Show less"', () => {
    render(
      <FeedbackSection title="Community Feedback" feedbacks={mockFeedbacks} />,
    );

    const showMoreButton = screen.getByTestId('feedback-show-more');
    fireEvent.click(showMoreButton);
    expect(screen.getByText(/David/i)).toBeInTheDocument();

    fireEvent.click(showMoreButton);
    expect(screen.queryByText(/David/i)).not.toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent('+ Show more');
  });

  it('renders fallback text when feedbacks array is empty', () => {
    render(<FeedbackSection title="Community Feedback" feedbacks={[]} />);

    expect(screen.getByText('There is no feedback yet!')).toBeInTheDocument();
    expect(screen.queryByTestId('feedback-show-more')).not.toBeInTheDocument();
  });
});
