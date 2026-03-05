import { ThemeProvider } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { CODE_LANGUAGES, PROFICIENCY_LEVELS } from '@utils/mentorshipConstants';
import theme from 'theme';

import LanguagesWithProficiency from '../mentorship/LanguagesWithProficiency';

const Wrapper = ({
  defaultValue = [],
  label,
}: {
  defaultValue?: unknown[];
  label?: string;
}) => {
  const methods = useForm({ defaultValues: { codeLanguages: defaultValue } });
  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <LanguagesWithProficiency
          name="codeLanguages"
          languages={CODE_LANGUAGES}
          proficiencyLevels={PROFICIENCY_LEVELS}
          label={label}
        />
      </FormProvider>
    </ThemeProvider>
  );
};

describe('LanguagesWithProficiency', () => {
  it('renders all language labels', () => {
    render(<Wrapper />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(screen.getByText('Ruby')).toBeInTheDocument();
    expect(screen.getByText('PHP')).toBeInTheDocument();
    expect(screen.getByText('Rust')).toBeInTheDocument();
    expect(screen.getByText('Kotlin')).toBeInTheDocument();
  });

  it('shows "Not Applicable" as default for all dropdowns', () => {
    render(<Wrapper />);
    const notApplicable = screen.getAllByText('Not Applicable');
    expect(notApplicable.length).toBe(CODE_LANGUAGES.length);
  });

  it('shows proficiency options when a dropdown is opened', () => {
    render(<Wrapper />);
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

  it('renders an optional section label when provided', () => {
    render(<Wrapper label="Programming languages" />);
    expect(screen.getByText('Programming languages')).toBeInTheDocument();
  });

  it('renders the correct number of dropdowns — one per language', () => {
    render(<Wrapper />);
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBe(CODE_LANGUAGES.length);
  });
});
