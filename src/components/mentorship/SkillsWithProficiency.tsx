import { Box, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { AreaGroup, LabelValue } from '@utils/mentorshipConstants';

import {
  boldLabelStyle,
  inputStyle,
  sectionHeaderStyle,
} from './mentorshipStyles';

interface Props {
  name: string;
  groups: AreaGroup[];
  proficiencyLevels: LabelValue[];
  /** Optional label shown above the whole section */
  label?: string;
}

interface AreaProficiency {
  technicalArea: string;
  proficiencyLevel: string;
}

/**
 * Renders a grouped list of technical areas, each with a proficiency-level
 * dropdown. Only areas with a selected proficiency are stored in the RHF array
 * field (items cleared to empty string are removed).
 */
const SkillsWithProficiency = ({
  name,
  groups,
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
        const currentValue: AreaProficiency[] = field.value ?? [];

        const getProficiency = (areaValue: string): string =>
          currentValue.find((item) => item.technicalArea === areaValue)
            ?.proficiencyLevel ?? '';

        const handleChange = (areaValue: string, proficiencyLevel: string) => {
          if (!proficiencyLevel) {
            field.onChange(
              currentValue.filter((item) => item.technicalArea !== areaValue),
            );
          } else {
            const exists = currentValue.some(
              (item) => item.technicalArea === areaValue,
            );
            if (exists) {
              field.onChange(
                currentValue.map((item) =>
                  item.technicalArea === areaValue
                    ? { ...item, proficiencyLevel }
                    : item,
                ),
              );
            } else {
              field.onChange([
                ...currentValue,
                { technicalArea: areaValue, proficiencyLevel },
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

            {groups.map((group) => (
              <Box key={group.title}>
                <Typography variant="h6" sx={sectionHeaderStyle}>
                  {group.title}
                </Typography>

                {group.areas.map((area) => (
                  <Box key={area.value}>
                    <Typography variant="subtitle2" sx={boldLabelStyle}>
                      {area.label}
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      value={getProficiency(area.value)}
                      onChange={(e) => handleChange(area.value, e.target.value)}
                      sx={inputStyle}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected: unknown) =>
                          selected
                            ? (proficiencyLevels.find(
                                (l) => l.value === selected,
                              )?.label ?? String(selected))
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

export default SkillsWithProficiency;
