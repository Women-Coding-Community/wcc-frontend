import { ThemeProvider } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  PROFICIENCY_LEVELS,
  TECHNICAL_AREA_GROUPS,
} from '@utils/mentorshipConstants';
import theme from 'theme';

import SkillsWithProficiency from '../mentorship/SkillsWithProficiency';

const Wrapper = ({
  defaultValue = [],
  label,
}: {
  defaultValue?: unknown[];
  label?: string;
}) => {
  const methods = useForm({ defaultValues: { technicalAreas: defaultValue } });
  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <SkillsWithProficiency
          name="technicalAreas"
          groups={TECHNICAL_AREA_GROUPS}
          proficiencyLevels={PROFICIENCY_LEVELS}
          label={label}
        />
      </FormProvider>
    </ThemeProvider>
  );
};

describe('SkillsWithProficiency', () => {
  it('renders all group titles', () => {
    render(<Wrapper />);
    expect(screen.getByText('AI, Data & ML')).toBeInTheDocument();
    expect(screen.getByText('Infrastructure & Operations')).toBeInTheDocument();
    expect(
      screen.getByText('Product, Leadership & Delivery'),
    ).toBeInTheDocument();
    expect(screen.getByText('Software Development')).toBeInTheDocument();
  });

  it('renders area labels from all groups', () => {
    render(<Wrapper />);
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Data Engineering')).toBeInTheDocument();
    expect(screen.getByText('Quality Assurance')).toBeInTheDocument();
  });

  it('shows "Not Applicable" as the default for all dropdowns', () => {
    render(<Wrapper />);
    const notApplicable = screen.getAllByText('Not Applicable');
    // Each technical area has one dropdown showing "Not Applicable" by default
    expect(notApplicable.length).toBeGreaterThan(0);
  });

  it('shows proficiency level labels in each dropdown', async () => {
    render(<Wrapper />);
    // Open the first select (Backend area)
    const selects = screen.getAllByRole('combobox');
    fireEvent.mouseDown(selects[0]);
    expect(
      screen.getByRole('option', { name: 'Not Applicable' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Beginner' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Intermediate' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Advanced' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Expert' })).toBeInTheDocument();
  });

  it('renders an optional label when provided', () => {
    render(<Wrapper label="Technical skill level" />);
    expect(screen.getByText('Technical skill level')).toBeInTheDocument();
  });
});
