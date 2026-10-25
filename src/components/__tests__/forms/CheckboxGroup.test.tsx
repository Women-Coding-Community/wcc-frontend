import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { CheckboxGroup } from 'components/forms';

import { FormValue, renderForm } from './renderForm';

interface FormValues {
  interests: string[];
  otherInterest: string;
}

interface RenderCheckboxGroupProps {
  defaultValues?: string[];
  defaultOther?: string;
  showOtherOption?: boolean;
  withOtherField?: boolean;
  withError?: boolean;
}

const OPTIONS = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'design', label: 'Design' },
];

const renderCheckboxGroup = ({
  defaultValues = [],
  defaultOther = '',
  showOtherOption = false,
  withOtherField = true,
  withError = false,
}: RenderCheckboxGroupProps = {}) =>
  renderForm<FormValues>({
    defaultValues: { interests: defaultValues, otherInterest: defaultOther },
    errors: withError ? { interests: 'Select an interest' } : undefined,
    children: ({ control, watch }) => (
      <>
        <CheckboxGroup
          name="interests"
          control={control}
          label="Areas of interest"
          options={OPTIONS}
          showOtherOption={showOtherOption}
          otherFieldName={withOtherField ? 'otherInterest' : undefined}
        />
        <FormValue testId="selected-values" value={watch('interests')} />
        <FormValue testId="other-value" value={watch('otherInterest')} />
      </>
    ),
  });

const getSelectedValues = (): string[] =>
  JSON.parse(screen.getByTestId('selected-values').textContent || '[]');

describe('CheckboxGroup', () => {
  it('renders the group label and all option labels', () => {
    renderCheckboxGroup();

    expect(screen.getByText('Areas of interest')).toBeInTheDocument();
    OPTIONS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders a checkbox for every option', () => {
    renderCheckboxGroup();

    expect(screen.getAllByRole('checkbox')).toHaveLength(OPTIONS.length);
    OPTIONS.forEach(({ label }) => {
      expect(screen.getByRole('checkbox', { name: label })).toBeInTheDocument();
    });
  });

  it('checks the checkboxes for the values passed in', () => {
    renderCheckboxGroup({ defaultValues: ['frontend', 'design'] });

    expect(screen.getByRole('checkbox', { name: 'Frontend' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Backend' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Design' })).toBeChecked();
  });

  it('adds a value when an unchecked option is checked', () => {
    renderCheckboxGroup({ defaultValues: ['backend'] });

    fireEvent.click(screen.getByRole('checkbox', { name: 'Frontend' }));

    expect(getSelectedValues()).toEqual(['backend', 'frontend']);
    expect(screen.getByRole('checkbox', { name: 'Frontend' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Backend' })).toBeChecked();
  });

  it('removes a value when a checked option is unchecked', () => {
    renderCheckboxGroup({
      defaultValues: ['frontend', 'backend', 'design'],
    });

    fireEvent.click(screen.getByRole('checkbox', { name: 'Backend' }));

    expect(getSelectedValues()).toEqual(['frontend', 'design']);
    expect(screen.getByRole('checkbox', { name: 'Backend' })).not.toBeChecked();
  });

  it('does not render the "Other" option by default', () => {
    renderCheckboxGroup();

    expect(screen.queryByText('Other:')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('does not render the "Other" option when no other field name is provided', () => {
    renderCheckboxGroup({ showOtherOption: true, withOtherField: false });

    expect(screen.queryByText('Other:')).not.toBeInTheDocument();
  });

  it('renders the "Other" checkbox and text field when enabled', () => {
    renderCheckboxGroup({ showOtherOption: true });

    expect(screen.getByText('Other:')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Other:/ })).not.toBeChecked();
    expect(screen.getByPlaceholderText('Please specify')).toBeInTheDocument();
  });

  it('disables the "Other" text field until the "Other" option is checked', () => {
    renderCheckboxGroup({ showOtherOption: true });

    const otherCheckbox = screen.getByRole('checkbox', { name: /Other:/ });
    const otherInput = screen.getByPlaceholderText('Please specify');

    expect(otherInput).toBeDisabled();

    fireEvent.click(otherCheckbox);

    expect(getSelectedValues()).toEqual(['other']);
    expect(otherCheckbox).toBeChecked();
    expect(otherInput).toBeEnabled();
  });

  it('re-enables and clears the selection when "Other" is unchecked', () => {
    renderCheckboxGroup({
      showOtherOption: true,
      defaultValues: ['frontend', 'other'],
    });

    const otherCheckbox = screen.getByRole('checkbox', { name: /Other:/ });
    const otherInput = screen.getByPlaceholderText('Please specify');

    expect(otherCheckbox).toBeChecked();
    expect(otherInput).toBeEnabled();

    fireEvent.click(otherCheckbox);

    expect(getSelectedValues()).toEqual(['frontend']);
    expect(otherCheckbox).not.toBeChecked();
    expect(otherInput).toBeDisabled();
  });

  it('updates the other field when typing in the "Other" text field', () => {
    renderCheckboxGroup({ showOtherOption: true, defaultValues: ['other'] });

    const otherInput = screen.getByPlaceholderText('Please specify');
    fireEvent.change(otherInput, { target: { value: 'Accessibility' } });

    expect(otherInput).toHaveValue('Accessibility');
    expect(
      JSON.parse(screen.getByTestId('other-value').textContent || 'null'),
    ).toBe('Accessibility');
  });

  it('shows the validation error message when the field is invalid', () => {
    renderCheckboxGroup({ withError: true });

    expect(screen.getByText('Select an interest')).toBeInTheDocument();
  });

  it('does not show an error message when the field is valid', () => {
    renderCheckboxGroup();

    expect(screen.queryByText('Select an interest')).not.toBeInTheDocument();
  });
});
