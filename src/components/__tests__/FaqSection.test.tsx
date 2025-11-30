import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { FaqSectionProps } from '../../utils/types';
import { FaqSection } from '../FaqSection';

const mockProps: FaqSectionProps = {
  title: 'Test mentorship FAQ',
  items: [
    {
      question: 'How do I join the mentorship program?',
      answer:
        "You can access comprehensive information about the mentorship program's timelines and registration process by visiting our dedicated mentorship page.",
    },
    {
      question: 'How long does the mentorship program last?',
      answer:
        'The Mentorship programme lasts from March till November of the same year.',
    },
  ],
};

const renderComponent = () => render(<FaqSection {...mockProps} />);

const q1 = mockProps.items[0].question;
const q2 = mockProps.items[1].question;
const a1 = mockProps.items[0].answer;
const a2 = mockProps.items[1].answer;

describe('FaqSection - Reusable Component Logic', () => {
  test('should render section title and all question summaries', () => {
    renderComponent();

    expect(screen.getByText('Test mentorship FAQ')).toBeInTheDocument();
    expect(screen.getByText(q1)).toBeInTheDocument();
    expect(screen.getByText(q2)).toBeInTheDocument();
  });

  test('should open Q1 and collapse it when Q2 is opened', async () => {
    renderComponent();
    const question1 = screen.getByText(q1);
    const question2 = screen.getByText(q2);

    fireEvent.click(question1);
    expect(screen.getByText(a1)).toBeVisible();

    fireEvent.click(question2);
    await waitFor(() => {
      expect(screen.getByText(a2)).toBeVisible();
      expect(screen.getByText(a1)).not.toBeVisible();
    });
  });
});
