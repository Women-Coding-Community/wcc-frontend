import { TextField as MuiTextField } from '@mui/material';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';

interface TextAreaProps<T extends FieldValues>
  extends Omit<MuiTextFieldProps, 'name'> {
  name: FieldPath<T>;
  control: Control<T>;
  rows?: number;
}

function TextArea<T extends FieldValues>({
  name,
  control,
  rows = 4,
  ...other
}: TextAreaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTextField
          {...field}
          {...other}
          error={!!error}
          helperText={error ? error.message : other.helperText}
          fullWidth
          multiline
          rows={rows}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(223, 227, 231, 1)',
              '& fieldset': {
                borderColor: 'rgba(223, 227, 231, 1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(223, 227, 231, 1)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(223, 227, 231, 1)',
              },
            },
            ...other.sx,
          }}
        />
      )}
    />
  );
}

export default TextArea;
