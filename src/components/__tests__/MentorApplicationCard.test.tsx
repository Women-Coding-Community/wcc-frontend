import { ThemeProvider } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import theme from 'theme';

import MentorApplicationCard, {
  MentorOption,
} from '../mentorship/MentorApplicationCard';

const mockMentors: MentorOption[] = [
  { id: 1, fullName: 'Alice Johnson', position: 'Senior Engineer' },
  { id: 2, fullName: 'Bob Smith', position: 'Tech Lead' },
];

// Default mentorId is undefined so MUI Select shows the empty/placeholder state
const makeDefaultApplication = (overrides = {}) => ({
  mentorId: undefined,
  priorityOrder: 1,
  whyMentor: '',
  applicationMessage: '',
  ...overrides,
});

const Wrapper = ({
  index = 0,
  onRemove = jest.fn(),
  extraApplications = 0,
}: {
  index?: number;
  onRemove?: () => void;
  extraApplications?: number;
}) => {
  const defaults = Array.from(
    { length: index + 1 + extraApplications },
    (_, i) => makeDefaultApplication({ priorityOrder: i + 1 }),
  );
  const methods = useForm({ defaultValues: { applications: defaults } });
  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <MentorApplicationCard
          index={index}
          mentors={mockMentors}
          onRemove={onRemove}
        />
      </FormProvider>
    </ThemeProvider>
  );
};

describe('MentorApplicationCard', () => {
  it('renders mentor preference heading with correct index', () => {
    render(<Wrapper index={0} />);
    expect(screen.getByText('Mentor preference #1')).toBeInTheDocument();
  });

  it('renders the mentor selector label', () => {
    render(<Wrapper />);
    // MUI InputLabel renders the text in multiple nodes; assert at least one exists
    expect(screen.getAllByText('Select mentor *').length).toBeGreaterThan(0);
  });

  it('renders the priority selector label', () => {
    render(<Wrapper />);
    expect(screen.getAllByText('Priority *').length).toBeGreaterThan(0);
  });

  it('renders the "why mentor" textarea', () => {
    render(<Wrapper />);
    expect(
      screen.getByPlaceholderText(
        "Explain why this mentor's skills and experience match your goals",
      ),
    ).toBeInTheDocument();
  });

  it('renders the optional application message textarea', () => {
    render(<Wrapper />);
    // The label text is split across Typography + span so query by placeholder
    expect(
      screen.getByPlaceholderText(
        'Anything else you would like the mentor to know about you?',
      ),
    ).toBeInTheDocument();
  });

  it('calls onRemove when the remove button is clicked', () => {
    const onRemove = jest.fn();
    render(<Wrapper onRemove={onRemove} />);
    const removeButton = screen.getByRole('button', {
      name: /remove mentor preference 1/i,
    });
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('renders second card with correct heading for index 1', () => {
    render(<Wrapper index={1} />);
    expect(screen.getByText('Mentor preference #2')).toBeInTheDocument();
  });
});
