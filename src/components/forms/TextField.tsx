import { TextField as MuiTextField } from '@mui/material';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';

interface TextFieldProps<T extends FieldValues>
  extends Omit<MuiTextFieldProps, 'name'> {
  name: FieldPath<T>;
  control: Control<T>;
}

function TextField<T extends FieldValues>({
  name,
  control,
  ...other
}: TextFieldProps<T>) {
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

export default TextField;
