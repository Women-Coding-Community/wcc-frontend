import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';

interface RadioGroupProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  options: Array<{ value: string; label: string }>;
}

function RadioGroup<T extends FieldValues>({
  name,
  control,
  label,
  options,
}: RadioGroupProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" error={!!error} fullWidth>
          <FormLabel component="legend">{label}</FormLabel>
          <MuiRadioGroup {...field}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </MuiRadioGroup>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

export default RadioGroup;
