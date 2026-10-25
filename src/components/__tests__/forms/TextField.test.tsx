import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { TextField } from 'components/forms';

import { FormValue, renderForm } from './renderForm';

interface FormValues {
  email: string;
}

interface RenderTextFieldProps {
  defaultValue?: string;
  withError?: boolean;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
}

const renderTextField = ({
  defaultValue = '',
  withError = false,
  helperText,
  placeholder,
  disabled,
}: RenderTextFieldProps = {}) =>
  renderForm<FormValues>({
    defaultValues: { email: defaultValue },
    errors: withError ? { email: 'Email is required' } : undefined,
    children: ({ control, watch }) => (
      <>
        <TextField<FormValues>
          name="email"
          control={control}
          label="Email address"
          placeholder={placeholder}
          helperText={helperText}
          disabled={disabled}
        />
        <FormValue testId="field-value" value={watch('email')} />
      </>
    ),
  });

describe('TextField', () => {
  it('renders the label and an input', () => {
    renderTextField();

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the default value', () => {
    renderTextField({ defaultValue: 'abc@example.com' });

    expect(screen.getByRole('textbox')).toHaveValue('abc@example.com');
  });

  it('updates the form value when the user types', () => {
    renderTextField();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'abc@example.com' },
    });

    expect(screen.getByTestId('field-value')).toHaveTextContent(
      '"abc@example.com"',
    );
    expect(screen.getByRole('textbox')).toHaveValue('abc@example.com');
  });

  it('renders a placeholder', () => {
    renderTextField({ placeholder: 'you@example.com' });

    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('renders custom helper text when there is no error', () => {
    renderTextField({ helperText: 'We will never share your email' });

    expect(
      screen.getByText('We will never share your email'),
    ).toBeInTheDocument();
  });

  it('shows the validation error message instead of the helper text', () => {
    renderTextField({
      withError: true,
      helperText: 'We will never share your email',
    });

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(
      screen.queryByText('We will never share your email'),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not show an error message when the field is valid', () => {
    renderTextField({ defaultValue: 'ada@example.com' });

    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-invalid',
      'false',
    );
  });

  it('can be disabled', () => {
    renderTextField({ disabled: true });

    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
