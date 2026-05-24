import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  TextField as MuiTextField,
} from '@mui/material';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';

interface CheckboxGroupProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  options: Array<{ value: string; label: string }>;
  showOtherOption?: boolean;
  otherFieldName?: FieldPath<T>;
}

function CheckboxGroup<T extends FieldValues>({
  name,
  control,
  label,
  options,
  showOtherOption = false,
  otherFieldName,
}: CheckboxGroupProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const selectedValues = (value as string[]) || [];

        const handleChange = (optionValue: string, checked: boolean) => {
          if (checked) {
            onChange([...selectedValues, optionValue]);
          } else {
            onChange(selectedValues.filter((v) => v !== optionValue));
          }
        };

        return (
          <FormControl component="fieldset" error={!!error} fullWidth>
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={selectedValues.includes(option.value)}
                      onChange={(e) =>
                        handleChange(option.value, e.target.checked)
                      }
                    />
                  }
                  label={option.label}
                />
              ))}
              {showOtherOption && otherFieldName && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedValues.includes('other')}
                      onChange={(e) => handleChange('other', e.target.checked)}
                    />
                  }
                  label={
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span>Other:</span>
                      <Controller
                        name={otherFieldName}
                        control={control}
                        render={({ field: otherField }) => (
                          <MuiTextField
                            {...otherField}
                            placeholder="Please specify"
                            size="small"
                            sx={{ width: '200px' }}
                            disabled={!selectedValues.includes('other')}
                          />
                        )}
                      />
                    </div>
                  }
                />
              )}
            </FormGroup>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}

export default CheckboxGroup;
