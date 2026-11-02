import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import React, { ReactElement, useEffect } from 'react';
import {
  Control,
  DefaultValues,
  FieldPath,
  FieldValues,
  UseFormWatch,
  useForm,
} from 'react-hook-form';

import theme from 'theme';

/**
 * Test helpers to avoid duplicating boilerplate for
 * rendering form components with a real react-hook-form
 * context with the MUI theme.
 *
 * This file intentionally contains no tests; it is a shared helper living
 * alongside the tests.
 */

interface FormContext<T extends FieldValues> {
  control: Control<T>;
  watch: UseFormWatch<T>;
}

interface RenderFormProps<T extends FieldValues> {
  children: React.FC<FormContext<T>>;
  defaultValues?: DefaultValues<T>;
  errors?: Partial<Record<FieldPath<T>, string>>;
}

interface FormValueProps {
  testId: string;
  value: unknown;
}

const TestForm = <T extends FieldValues>({
  children,
  defaultValues,
  errors,
}: RenderFormProps<T>) => {
  const { control, setError, watch } = useForm<T>({ defaultValues });

  useEffect(() => {
    if (!errors) {
      return;
    }

    (Object.entries(errors) as Array<[FieldPath<T>, string]>).forEach(
      ([name, message]) => {
        setError(name, { type: 'manual', message });
      },
    );
  }, [errors, setError]);

  return (
    <ThemeProvider theme={theme}>{children({ control, watch })}</ThemeProvider>
  );
};

/**
 * Renders `children` inside a form backed by `useForm`, passing `control` and
 * `watch` to the render-prop. Optional `errors` are pushed into the form via
 * `setError` after mount, which lets tests assert validation error states.
 *
 * @example
 * renderForm<MyForm>({
 *   defaultValues: { name: '' },
 *   errors: { name: 'Name is required' },
 *   children: ({ control }) => <NameField control={control} />,
 * });
 */
export const renderForm = <T extends FieldValues>(props: RenderFormProps<T>) =>
  render(<TestForm {...props} />);

/** Renders any React element wrapped in the application MUI theme. */
export const renderWithTheme = (ui: ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

/**
 * Renders a value as JSON for tests that need to assert on a watched field.
 */
export const FormValue = ({ testId, value }: FormValueProps) => (
  <div data-testid={testId}>{JSON.stringify(value)}</div>
);
