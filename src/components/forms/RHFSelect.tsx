import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import type { SelectProps } from '@mui/material';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';

interface RHFSelectProps<T extends FieldValues>
  extends Omit<SelectProps, 'name'> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  options: Array<{ value: string; label: string }>;
}

function RHFSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  ...other
}: RHFSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            {...other}
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
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

export default RHFSelect;
