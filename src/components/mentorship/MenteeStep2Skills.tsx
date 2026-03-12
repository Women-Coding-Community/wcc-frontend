import {
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  CODE_LANGUAGES,
  MENTORSHIP_FOCUS_AREAS,
  PROFICIENCY_LEVELS,
  SPOKEN_LANGUAGES,
  TECHNICAL_AREA_GROUPS,
} from '@utils/mentorshipConstants';

import LanguagesWithProficiency from './LanguagesWithProficiency';
import { inputStyle } from './mentorshipStyles';
import SkillsWithProficiency from './SkillsWithProficiency';
import StepSection from './StepSection';

const EXPERIENCE_OPTIONS = [
  { label: 'No experience', value: 0 },
  { label: '0–1 year', value: 1 },
  { label: '1–2 years', value: 2 },
  { label: '3–5 years', value: 3 },
  { label: '6–9 years', value: 6 },
  { label: '10+ years', value: 10 },
];

const MenteeStep2Skills = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const skillsErrors = errors.skills as any;

  return (
    <StepSection
      title="Skills & Experience"
      description="Tell us about your technical background so we can help match you with the right mentor."
    >
      <Grid container spacing={3}>
        {/* Years of experience */}
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            Years of experience *
          </Typography>
          <Controller
            name="skills.yearsExperience"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                fullWidth
                value={field.value ?? ''}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!error}
                helperText={error?.message}
                sx={inputStyle}
              >
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {/* Technical areas with proficiency */}
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}
          >
            Technical areas — select your skill level *
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Only areas where you select a skill level will be included. Leave
            others as &quot;Not Applicable&quot;.
          </Typography>
          <SkillsWithProficiency
            name="skills.areas"
            groups={TECHNICAL_AREA_GROUPS}
            proficiencyLevels={PROFICIENCY_LEVELS}
          />
          {skillsErrors?.areas && (
            <FormHelperText error>{skillsErrors.areas.message}</FormHelperText>
          )}
        </Grid>

        {/* Programming languages with proficiency */}
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}
          >
            Programming languages — select your skill level *
          </Typography>
          <LanguagesWithProficiency
            name="skills.languages"
            languages={CODE_LANGUAGES}
            proficiencyLevels={PROFICIENCY_LEVELS}
          />
          {skillsErrors?.languages && (
            <FormHelperText error>
              {skillsErrors.languages.message}
            </FormHelperText>
          )}
        </Grid>

        {/* Mentorship focus */}
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}
          >
            Mentorship goals *
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Select the goals you want to achieve through mentorship.
          </Typography>
          <Controller
            name="skills.mentorshipFocus"
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
                {error && (
                  <FormHelperText error>{error.message}</FormHelperText>
                )}
              </Box>
            )}
          />
        </Grid>

        {/* Spoken languages */}
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}
          >
            Spoken languages *
          </Typography>
          <Controller
            name="spokenLanguages"
            control={control}
            defaultValue={[]}
            render={({ field, fieldState: { error } }) => (
              <Box>
                <FormGroup row>
                  {SPOKEN_LANGUAGES.map((lang) => (
                    <FormControlLabel
                      key={lang.value}
                      sx={{ width: { xs: '100%', sm: '50%', md: '33%' } }}
                      control={
                        <Checkbox
                          checked={field.value?.includes(lang.value) ?? false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([
                                ...(field.value ?? []),
                                lang.value,
                              ]);
                            } else {
                              field.onChange(
                                (field.value ?? []).filter(
                                  (v: string) => v !== lang.value,
                                ),
                              );
                            }
                          }}
                        />
                      }
                      label={lang.label}
                    />
                  ))}
                </FormGroup>
                {error && (
                  <FormHelperText error>{error.message}</FormHelperText>
                )}
              </Box>
            )}
          />
        </Grid>

        {/* Bio */}
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
          >
            Bio *
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder="Tell us about yourself, your background, and what you're looking for in a mentorship"
            {...register('bio')}
            error={!!errors.bio}
            helperText={
              (errors.bio?.message as string) ??
              'Minimum 50 characters. This will be shared with your matched mentor.'
            }
            sx={inputStyle}
          />
        </Grid>
      </Grid>
    </StepSection>
  );
};

export default MenteeStep2Skills;
