import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { COUNTRIES, MENTORSHIP_TYPES } from '@utils/mentorshipConstants';

import { inputStyle } from './mentorshipStyles';
import StepSection from './StepSection';

const MenteeStep1BasicInfo = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const currentYear = new Date().getFullYear();
  const cycleYears = Array.from({ length: 7 }, (_, i) => currentYear + i);

  return (
    <StepSection
      title="Mentee Registration — Basic Information"
      description="Please fill in your personal details. All fields marked with * are required."
    >
      <Typography
        variant="caption"
        sx={{ display: 'block', mb: 4, color: 'error.main' }}
      >
        * Indicates a required field
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            Full name *
          </Typography>
          <TextField
            fullWidth
            placeholder="Jane Doe"
            {...register('fullName')}
            error={!!errors.fullName}
            helperText={errors.fullName?.message as string}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            Email address *
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="jane@example.com"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message as string}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            Slack display name *
          </Typography>
          <TextField
            fullWidth
            placeholder="@jane"
            {...register('slackDisplayName')}
            error={!!errors.slackDisplayName}
            helperText={errors.slackDisplayName?.message as string}
            sx={inputStyle}
          />
          {!errors.slackDisplayName && (
            <FormHelperText>
              Your application will be rejected if you are not in our Slack
              community.{' '}
              <NextLink
                href="https://womencodingcommunity.slack.com/signup#/domain-signup"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                Join us on Slack
              </NextLink>
              .
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            Country
          </Typography>
          <Controller
            name="country"
            control={control}
            defaultValue={{ countryCode: '', countryName: '' }}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <InputLabel>Country</InputLabel>
                <Select
                  label="Country"
                  value={field.value?.countryCode ?? ''}
                  onChange={(e) => {
                    const country = COUNTRIES.find(
                      (c) => c.code === e.target.value,
                    );
                    field.onChange(
                      country
                        ? {
                            countryCode: country.code,
                            countryName: country.name,
                          }
                        : { countryCode: '', countryName: '' },
                    );
                  }}
                  sx={inputStyle}
                >
                  <MenuItem value="">
                    <em>Select a country</em>
                  </MenuItem>
                  {COUNTRIES.map((c) => (
                    <MenuItem key={c.code} value={c.code}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            City *
          </Typography>
          <TextField
            fullWidth
            placeholder="London"
            {...register('city')}
            error={!!errors.city}
            helperText={errors.city?.message as string}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            Job title / education status *
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. Frontend Developer, Student"
            {...register('position')}
            error={!!errors.position}
            helperText={errors.position?.message as string}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            Company / university name
          </Typography>
          <TextField
            fullWidth
            placeholder="Acme Corp"
            {...register('companyName')}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            LinkedIn profile
          </Typography>
          <TextField
            fullWidth
            type="url"
            placeholder="https://www.linkedin.com/in/yourprofile"
            {...register('linkedInProfile')}
            error={!!errors.linkedInProfile}
            helperText={errors.linkedInProfile?.message as string}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            Preferred pronouns
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. she/her, they/them"
            {...register('pronouns')}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            Available hours per month *
          </Typography>
          <Controller
            name="availableHsMonth"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="number"
                fullWidth
                placeholder="e.g. 4"
                error={!!error}
                helperText={
                  error?.message ?? 'How many hours can you dedicate per month?'
                }
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                sx={inputStyle}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl error={!!errors.mentorshipType}>
            <FormLabel
              component="legend"
              sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}
            >
              Mentorship type *
            </FormLabel>
            <Controller
              name="mentorshipType"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  {MENTORSHIP_TYPES.map((type) => (
                    <FormControlLabel
                      key={type.value}
                      value={type.value}
                      control={<Radio />}
                      label={type.label}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.mentorshipType && (
              <FormHelperText>
                {errors.mentorshipType.message as string}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 0.5, color: 'text.primary' }}
          >
            Cycle year *
          </Typography>
          <Controller
            name="cycleYear"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <InputLabel>Year</InputLabel>
                <Select
                  {...field}
                  label="Year"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  sx={inputStyle}
                >
                  {cycleYears.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
    </StepSection>
  );
};

export default MenteeStep1BasicInfo;
