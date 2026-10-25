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

export const renderForm = <T extends FieldValues>(props: RenderFormProps<T>) =>
  render(<TestForm {...props} />);

export const renderWithTheme = (ui: ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

export const FormValue = ({ testId, value }: FormValueProps) => (
  <div data-testid={testId}>{JSON.stringify(value)}</div>
);
