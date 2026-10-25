import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { TextArea } from 'components/forms';

import { FormValue, renderForm } from './renderForm';

interface FormValues {
  bio: string;
}

interface RenderTextAreaProps {
  defaultValue?: string;
  withError?: boolean;
  helperText?: string;
  rows?: number;
}

const renderTextArea = ({
  defaultValue = '',
  withError = false,
  helperText,
  rows,
}: RenderTextAreaProps = {}) =>
  renderForm<FormValues>({
    defaultValues: { bio: defaultValue },
    errors: withError ? { bio: 'Bio is required' } : undefined,
    children: ({ control, watch }) => (
      <>
        <TextArea<FormValues>
          name="bio"
          control={control}
          label="Tell us about yourself"
          placeholder="Write a short bio"
          helperText={helperText}
          rows={rows}
        />
        <FormValue testId="field-value" value={watch('bio')} />
      </>
    ),
  });

describe('TextArea', () => {
  it('renders the label and a multiline textbox', () => {
    renderTextArea();

    expect(screen.getByLabelText('Tell us about yourself')).toBeInTheDocument();

    const textbox = screen.getByRole('textbox');
    expect(textbox.tagName).toBe('TEXTAREA');
    expect(textbox).toHaveAttribute('rows', '4');
  });

  it('uses the provided number of rows', () => {
    renderTextArea({ rows: 8 });

    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '8');
  });

  it('renders the default value', () => {
    renderTextArea({ defaultValue: 'Hello there' });

    expect(screen.getByRole('textbox')).toHaveValue('Hello there');
  });

  it('updates the form value when the user types', () => {
    renderTextArea();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'I like testing' },
    });

    expect(screen.getByTestId('field-value')).toHaveTextContent(
      '"I like testing"',
    );
    expect(screen.getByRole('textbox')).toHaveValue('I like testing');
  });

  it('renders a placeholder', () => {
    renderTextArea();

    expect(
      screen.getByPlaceholderText('Write a short bio'),
    ).toBeInTheDocument();
  });

  it('renders custom helper text when there is no error', () => {
    renderTextArea({ helperText: 'Max 500 characters' });

    expect(screen.getByText('Max 500 characters')).toBeInTheDocument();
  });

  it('shows the validation error message instead of the helper text', () => {
    renderTextArea({ withError: true, helperText: 'Max 500 characters' });

    expect(screen.getByText('Bio is required')).toBeInTheDocument();
    expect(screen.queryByText('Max 500 characters')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not show an error message when the field is valid', () => {
    renderTextArea({ defaultValue: 'All good' });

    expect(screen.queryByText('Bio is required')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-invalid',
      'false',
    );
  });
});
