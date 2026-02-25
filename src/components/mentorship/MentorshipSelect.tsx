import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, MenuItem } from '@mui/material';
import { inputStyle } from './mentorshipStyles';

interface MentorshipSelectProps {
  name: string;
  label?: string;
  options: string[];
}

export const MentorshipSelect = ({ name, label, options }: MentorshipSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue="Not Applicable"
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          select
          fullWidth
          sx={inputStyle}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected: any) => {
              if (!selected) return "Not Applicable";
              return selected;
            }
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
