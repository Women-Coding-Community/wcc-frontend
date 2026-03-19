import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  CODE_LANGUAGES,
  MENTORSHIP_FOCUS_AREAS,
  PROFICIENCY_LEVELS,
} from '@utils/mentorshipConstants';

import LanguagesWithProficiency from './LanguagesWithProficiency';
import StepSection from './StepSection';

const Step4ProgrammingSkills = () => {
  const { control } = useFormContext();

  return (
    <StepSection
      title="Technologies & Languages — mentorship goals"
      description="Select the technologies and languages you can help your mentee with and indicate your proficiency. None are mandatory."
    >
      <Box sx={{ maxWidth: '100%' }}>
        <LanguagesWithProficiency
          name="codeLanguages"
          languages={CODE_LANGUAGES}
          proficiencyLevels={PROFICIENCY_LEVELS}
        />

        <Divider sx={{ my: 4, borderColor: 'grey.300' }} />

        <Typography
          variant="body1"
          sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}
        >
          Which mentoring goals are you comfortable supporting?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Select all that apply. None are mandatory.
        </Typography>

        <Controller
          name="mentorshipFocusAreas"
          control={control}
          defaultValue={[]}
          render={({ field, fieldState: { error } }) => (
            <Box>
              <FormGroup>
                {MENTORSHIP_FOCUS_AREAS.map((area) => (
                  <FormControlLabel
                    key={area.value}
                    control={
                      <Checkbox
                        checked={field.value?.includes(area.value) ?? false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([
                              ...(field.value ?? []),
                              area.value,
                            ]);
                          } else {
                            field.onChange(
                              (field.value ?? []).filter(
                                (v: string) => v !== area.value,
                              ),
                            );
                          }
                        }}
                      />
                    }
                    label={area.label}
                  />
                ))}
              </FormGroup>
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </Box>
          )}
        />

        <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Page 4 of 5
          </Typography>
        </Box>
      </Box>
    </StepSection>
  );
};

export default Step4ProgrammingSkills;
