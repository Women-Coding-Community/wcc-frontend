import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { 
  Grid, TextField, MenuItem, Typography, Box, FormHelperText,
  FormGroup, FormControlLabel, Checkbox, Radio, RadioGroup, FormControl, FormLabel,
  Table, TableBody, TableCell, TableHead, TableRow 
} from '@mui/material';
import StepSection from './StepSection';
import { COUNTRIES } from '../../utils/mentorshipConstants';

const Step1BasicInfo = () => {
  const { register, watch, control, formState: { errors } } = useFormContext();

  const isLongTerm = watch("isLongTermMentor");
  const isAdHoc = watch("isAdHocMentor");

  const months = ["May", "June", "July", "August", "September", "October", "November"];

  return (   
    <StepSection
      title="WCC: Registration Form for Mentors"
      description="Thank you for your interest in long-term mentoring sessions. We appreciate your enthusiasm and look forward to connecting with the mentor of your choice.">
      <Typography variant="caption" sx={{ display: 'block', mb: 4, color: 'error.main' }}>
        * Indicates a required field
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>What is your full name? *</Typography>
          <TextField fullWidth placeholder="Jane Doe" {...register("firstName")} error={!!errors.firstName} helperText={errors.firstName?.message as string} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>What is your email address? *</Typography>
          <TextField fullWidth type="email" placeholder="jane@example.com" {...register("email")} error={!!errors.email} helperText={errors.email?.message as string} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>Slack Name *</Typography>
          <TextField fullWidth placeholder="@jane" {...register("slackName")} error={!!errors.slackName} helperText={errors.slackName?.message as string} />
          {!errors.slackName && (
    <FormHelperText sx={{ mt: 1 }}>Please note your application will be rejected if you are not in our Slack community.</FormHelperText>
  )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>Location *</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                select 
                fullWidth 
                label="Country" 
                defaultValue="" 
                {...register("country")} 
                error={!!errors.country} 
                helperText={errors.country?.message as string}
              >
                <MenuItem value="">
                  <em>Select a country</em>
                </MenuItem>
                {COUNTRIES.map((country) => (
                  <MenuItem key={country.code} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="City" {...register("city")} error={!!errors.city} helperText={errors.city?.message as string} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>What is your current job title? *</Typography>
          <TextField fullWidth {...register("jobTitle")} error={!!errors.jobTitle} helperText={errors.jobTitle?.message as string} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>Company name *</Typography>
          <TextField fullWidth {...register("company")} error={!!errors.company} helperText={errors.company?.message as string} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.primary' }}>
            Which kind of mentor you want to be? *
          </Typography>

          <FormGroup>
            <FormControlLabel control={<Checkbox {...register("isLongTermMentor")} />} label="Long-Term Format" />
            
            {isLongTerm && (
              <Box sx={{ mt: 1, p: 2, bgcolor: 'custom.softGray', borderRadius: 1 }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
                  Maximum number of mentees you are available to support. *
                </Typography>
                <Controller
                  name="maxMentees"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      size="small"
                      error={!!error}
                      helperText={error?.message}
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <MenuItem key={num} value={String(num)}>
                          {num === 6 ? '6+' : num}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            )}

            <FormControlLabel control={<Checkbox {...register("isAdHocMentor")} />} label="Ad-Hoc Format" />
            
            {isAdHoc && (
              <Box sx={{ mt: 1, p: 2, bgcolor: 'custom.softGray', borderRadius: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 2, color: 'text.primary' }}>
                  For each month below, please indicate the maximum number of mentees you are available to support. <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                </Typography>

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Table size="small" sx={{ '& td, & th': { borderBottom: 'none' } }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ pl: 0, width: '20%' }}></TableCell> 
                        {[1, 2, 3, 4, '5+'].map(num => (
                          <TableCell key={num} align="center" sx={{ fontWeight: 600, color: 'text.primary', pb: 2 }}>{num}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {months.map((month) => (
                        <TableRow key={month}>
                          <TableCell component="th" scope="row" sx={{ pl: 0, fontWeight: 400, fontSize: '16px' }}>{month}</TableCell>
                          <TableCell colSpan={5} padding="none">
                            <RadioGroup row sx={{ justifyContent: 'space-around', width: '100%' }} {...register(`adHocAvailability.${month}`)}>
                              {[1, 2, 3, 4, 5].map((val) => (
                                <Radio key={val} value={String(val)} size="small" sx={{ color: 'action.disabled', '&.Mui-checked': { color: 'text.primary' } }} />
                              ))}
                            </RadioGroup>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>                  
                </Box>

                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                  {months.map((month) => (
                    <Box key={month} sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                        {month}
                      </Typography>
                      <RadioGroup 
                        row 
                        sx={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 0.5
                        }} 
                        {...register(`adHocAvailability.${month}`)}
                      >
                        {[1, 2, 3, 4, 5].map((val) => (
                          <FormControlLabel 
                            key={val}
                            value={String(val)} 
                            control={<Radio size="small" sx={{ color: 'action.disabled', '&.Mui-checked': { color: 'text.primary' } }} />}
                            label={val === 5 ? '5+' : String(val)}
                            sx={{ 
                              flex: 1,
                              mx: 0,
                              '& .MuiFormControlLabel-label': {
                                fontSize: '14px'
                              }
                            }}
                          />
                        ))}
                      </RadioGroup>
                    </Box>
                  ))}
                </Box>
              {errors.adHocAvailability && (
                <FormHelperText error sx={{ mt: 2, textAlign: 'center', fontWeight: 'bold' }}>
                  Please select availability for at least one month
                </FormHelperText>
              )}
              </Box>
              
            )}
          </FormGroup>
          
          {errors.isLongTermMentor && (<FormHelperText error sx={{ mt: 1 }}>Please select at least one mentorship format.</FormHelperText>)}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>Calendly schedule link *</Typography>
          <TextField fullWidth placeholder="https://calendly.com/yourname" {...register("calendlyLink")} error={!!errors.calendlyLink} helperText={errors.calendlyLink?.message as string} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>What kind of Mentee are you looking for? *</Typography>
          <TextField fullWidth multiline rows={3} {...register("menteeExpectations")} error={!!errors.menteeExpectations} helperText={errors.menteeExpectations?.message as string} />
        </Grid>

        <Grid item xs={12}>
        <FormControl error={!!errors.openToNonWomen} component="fieldset">
          <FormLabel component="legend" sx={{ mb: 0.5, color: 'text.primary' }}>
            Are you open to mentoring individuals who do not identify as women? *
          </FormLabel>

          <Controller
            name="openToNonWomen"
            control={control}
            render={({ field }) => (
              <RadioGroup
                row
                aria-label="open to mentoring non-women"
                value={field.value !== undefined && field.value !== null ? String(field.value) : ''}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />

        <FormHelperText>
          {errors.openToNonWomen?.message as string || ''}
        </FormHelperText>
        </FormControl>
      </Grid>

      </Grid>
    </StepSection>
  );
};

export default Step1BasicInfo;
