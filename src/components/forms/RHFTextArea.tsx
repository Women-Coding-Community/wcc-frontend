import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';

interface RHFTextAreaProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'name'> {
  name: FieldPath<T>;
  control: Control<T>;
  rows?: number;
}

function RHFTextArea<T extends FieldValues>({
  name,
  control,
  rows = 4,
  ...other
}: RHFTextAreaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
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

export default RHFTextArea;
