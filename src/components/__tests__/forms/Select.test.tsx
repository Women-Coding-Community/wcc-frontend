import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { Select } from 'components/forms';

import { FormValue, renderForm } from './renderForm';

interface FormValues {
  country: string;
}

const OPTIONS = [
  { value: 'pl', label: 'Poland' },
  { value: 'es', label: 'Spain' },
  { value: 'br', label: 'Brazil' },
];

interface RenderSelectProps {
  defaultValue?: string;
  withError?: boolean;
  disabled?: boolean;
}

const renderSelect = ({
  defaultValue = '',
  withError = false,
  disabled,
}: RenderSelectProps = {}) =>
  renderForm<FormValues>({
    defaultValues: { country: defaultValue },
    errors: withError ? { country: 'Country is required' } : undefined,
    children: ({ control, watch }) => (
      <>
        <Select<FormValues>
          name="country"
          control={control}
          label="Country"
          options={OPTIONS}
          disabled={disabled}
        />
        <FormValue testId="field-value" value={watch('country')} />
      </>
    ),
  });

const openSelect = () => {
  fireEvent.mouseDown(screen.getByRole('combobox'));
};

describe('Select', () => {
  it('renders the label and a combobox', () => {
    renderSelect();

    expect(
      screen.getByText('Country', { selector: 'label' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders a placeholder option', () => {
    renderSelect();
    openSelect();

    expect(
      screen.getByRole('option', { name: 'Select Country' }),
    ).toBeInTheDocument();
  });

  it('renders an option for each provided value', () => {
    renderSelect();
    openSelect();

    OPTIONS.forEach(({ label }) => {
      expect(screen.getByRole('option', { name: label })).toBeInTheDocument();
    });
  });

  it('shows the default value in the combobox', () => {
    renderSelect({ defaultValue: 'es' });

    expect(screen.getByRole('combobox')).toHaveTextContent('Spain');
  });

  it('updates the form value when an option is selected', () => {
    renderSelect();
    openSelect();

    fireEvent.click(screen.getByRole('option', { name: 'Brazil' }));

    expect(screen.getByTestId('field-value')).toHaveTextContent('"br"');
    expect(screen.getByRole('combobox')).toHaveTextContent('Brazil');
  });

  it('shows the validation error message when the field is invalid', () => {
    renderSelect({ withError: true });

    expect(screen.getByText('Country is required')).toBeInTheDocument();
  });

  it('does not show an error message when the field is valid', () => {
    renderSelect({ defaultValue: 'pl' });

    expect(screen.queryByText('Country is required')).not.toBeInTheDocument();
  });

  it('can be disabled', () => {
    renderSelect({ disabled: true });

    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });
});
