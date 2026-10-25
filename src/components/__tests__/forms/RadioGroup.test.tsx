import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { RadioGroup } from 'components/forms';

import { FormValue, renderForm } from './renderForm';

interface FormValues {
  experience: string;
}

const OPTIONS = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid-level' },
  { value: 'senior', label: 'Senior' },
];

interface RenderRadioGroupProps {
  defaultValue?: string;
  withError?: boolean;
}

const renderRadioGroup = ({
  defaultValue = '',
  withError = false,
}: RenderRadioGroupProps = {}) =>
  renderForm<FormValues>({
    defaultValues: { experience: defaultValue },
    errors: withError
      ? { experience: 'Select your experience level' }
      : undefined,
    children: ({ control, watch }) => (
      <>
        <RadioGroup<FormValues>
          name="experience"
          control={control}
          label="Experience level"
          options={OPTIONS}
        />
        <FormValue testId="selected-value" value={watch('experience')} />
      </>
    ),
  });

describe('RadioGroup', () => {
  it('renders the group label and all option labels', () => {
    renderRadioGroup();

    expect(screen.getByText('Experience level')).toBeInTheDocument();
    OPTIONS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders a radio for every option', () => {
    renderRadioGroup();

    expect(screen.getAllByRole('radio')).toHaveLength(OPTIONS.length);
    OPTIONS.forEach(({ label }) => {
      expect(screen.getByRole('radio', { name: label })).toBeInTheDocument();
    });
  });

  it('checks the radio matching the default value', () => {
    renderRadioGroup({ defaultValue: 'mid' });

    expect(screen.getByRole('radio', { name: 'Mid-level' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Junior' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Senior' })).not.toBeChecked();
  });

  it('updates the value when a different option is selected', () => {
    renderRadioGroup({ defaultValue: 'junior' });

    fireEvent.click(screen.getByRole('radio', { name: 'Senior' }));

    expect(screen.getByTestId('selected-value')).toHaveTextContent('"senior"');
    expect(screen.getByRole('radio', { name: 'Senior' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Junior' })).not.toBeChecked();
  });

  it('shows the validation error message when the field is invalid', () => {
    renderRadioGroup({ withError: true });

    expect(
      screen.getByText('Select your experience level'),
    ).toBeInTheDocument();
  });

  it('does not show an error message when the field is valid', () => {
    renderRadioGroup({ defaultValue: 'mid' });

    expect(
      screen.queryByText('Select your experience level'),
    ).not.toBeInTheDocument();
  });
});
