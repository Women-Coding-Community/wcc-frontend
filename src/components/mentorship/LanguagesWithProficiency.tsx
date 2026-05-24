import { Box, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { LabelValue } from '@utils/mentorshipConstants';

import { boldLabelStyle, inputStyle } from './mentorshipStyles';

interface Props {
  name: string;
  languages: LabelValue[];
  proficiencyLevels: LabelValue[];
  /** Optional label shown above the list */
  label?: string;
}

interface LanguageProficiency {
  language: string;
  proficiencyLevel: string;
}

/**
 * Renders a list of programming languages, each with a proficiency-level
 * dropdown. Only languages with a selected proficiency are stored in the RHF
 * array field.
 */
const LanguagesWithProficiency = ({
  name,
  languages,
  proficiencyLevels,
  label,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field, fieldState: { error } }) => {
        const currentValue: LanguageProficiency[] = field.value ?? [];

        const getProficiency = (langValue: string): string =>
          currentValue.find((item) => item.language === langValue)
            ?.proficiencyLevel ?? '';

        const handleChange = (langValue: string, proficiencyLevel: string) => {
          if (!proficiencyLevel) {
            field.onChange(
              currentValue.filter((item) => item.language !== langValue),
            );
          } else {
            const exists = currentValue.some(
              (item) => item.language === langValue,
            );
            if (exists) {
              field.onChange(
                currentValue.map((item) =>
                  item.language === langValue
                    ? { ...item, proficiencyLevel }
                    : item,
                ),
              );
            } else {
              field.onChange([
                ...currentValue,
                { language: langValue, proficiencyLevel },
              ]);
            }
          }
        };

        return (
          <Box>
            {label && (
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                {label}
              </Typography>
            )}

            {languages.map((lang) => (
              <Box key={lang.value}>
                <Typography variant="subtitle2" sx={boldLabelStyle}>
                  {lang.label}
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={getProficiency(lang.value)}
                  onChange={(e) => handleChange(lang.value, e.target.value)}
                  sx={inputStyle}
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected: unknown) =>
                      selected
                        ? (proficiencyLevels.find((l) => l.value === selected)
                            ?.label ?? String(selected))
                        : 'Not Applicable',
                  }}
                >
                  <MenuItem value="">Not Applicable</MenuItem>
                  {proficiencyLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            ))}

            {error && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {error.message}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
};

export default LanguagesWithProficiency;
