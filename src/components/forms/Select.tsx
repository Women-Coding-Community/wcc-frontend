import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import type { SelectProps as MuiSelectProps } from '@mui/material';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';

interface SelectProps<T extends FieldValues>
  extends Omit<MuiSelectProps, 'name'> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  options: Array<{ value: string; label: string }>;
}

function Select<T extends FieldValues>({
  name,
  control,
  label,
  options,
  ...other
}: SelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel>{label}</InputLabel>
          <MuiSelect
            {...field}
            {...(other as any)}
            label={label}
            sx={{
              backgroundColor: 'rgba(223, 227, 231, 1)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(223, 227, 231, 1)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(223, 227, 231, 1)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(223, 227, 231, 1)',
              },
              ...other.sx,
            }}
          >
            <MenuItem value="">
              <em>Select {label}</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </MuiSelect>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

export default Select;
