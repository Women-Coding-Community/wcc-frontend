import React from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  Grid, TextField, MenuItem, Typography, Box, FormHelperText,
  FormGroup, FormControlLabel, Checkbox, Radio, RadioGroup, FormControl, FormLabel,
  Table, TableBody, TableCell, TableHead, TableRow 
} from '@mui/material';

const Step1BasicInfo = () => {
  const { register, watch, formState: { errors } } = useFormContext();  
  const isLongTerm = watch("isLongTermMentor");
  const isAdHoc = watch("isAdHocMentor");

  const months = ["May", "June", "July", "August", "September", "October", "November"];

  return (
    <Box>
      <Typography variant="h5" sx={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: '22px', mb: 2 }}>
        WCC: Registration Form for Mentors
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, lineHeight: '24px' }}>
        Thank you for your interest in long-term mentoring sessions. 
        We appreciate your enthusiasm and look forward to connecting with the mentor of your choice.
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', mb: 4, color: 'error.main' }}>
        * Indicates a required field
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>What is your full name? *</Typography>
          <TextField fullWidth placeholder="Jane Doe" {...register("firstName")} error={!!errors.firstName} helperText={errors.firstName?.message as string} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>What is your email address? *</Typography>
          <TextField fullWidth type="email" placeholder="jane@example.com" {...register("email")} error={!!errors.email} helperText={errors.email?.message as string} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Slack Name *</Typography>
          <TextField fullWidth placeholder="@jane" {...register("slackName")} error={!!errors.slackName} />
          <FormHelperText sx={{ mt: 1 }}>Please note your application will be rejected if you are not in our Slack community.</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Location *</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Country" defaultValue="" {...register("country")} error={!!errors.country}>
                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                <MenuItem value="United States">United States</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="City" {...register("city")} error={!!errors.city} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>What is your current job title? *</Typography>
          <TextField fullWidth {...register("jobTitle")} error={!!errors.jobTitle} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Company name *</Typography>
          <TextField fullWidth {...register("company")} error={!!errors.company} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: errors.isLongTermMentor ? 'error.main' : 'text.primary' }}>
            Which kind of mentor you want to be? *
          </Typography>
          
          <FormGroup>
            <FormControlLabel control={<Checkbox {...register("isLongTermMentor")} />} label="Long-Term Format" />
            
            {isLongTerm && (
              <Box sx={{ ml: 4, mb: 3, p: 2, bgcolor: '#f9f9f9', borderRadius: 1 }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
                  Maximum number of mentees you are available to support. *
                </Typography>
                <TextField select fullWidth size="small" defaultValue="" {...register("maxMentees")} error={!!errors.maxMentees}>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <MenuItem key={num} value={String(num)}>{num === 6 ? '6+' : num}</MenuItem>
                  ))}
                </TextField>
              </Box>
            )}

            <FormControlLabel control={<Checkbox {...register("isAdHocMentor")} />} label="Ad-Hoc Format" />
            
            {isAdHoc && (
              <Box sx={{ ml: 4, mt: 1, p: 2, bgcolor: '#f9f9f9', borderRadius: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 2 }}>
                  For each month below, please indicate the maximum number of mentees you are available to support. *
                </Typography>
                
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      {[1, 2, 3, 4, '5+'].map(num => (
                        <TableCell key={num} align="center">{num}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {months.map((month) => (
                      <TableRow key={month}>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                          {month}
                        </TableCell>
                        <TableCell colSpan={5} padding="none">
                          <RadioGroup row sx={{ justifyContent: 'space-around', width: '100%' }} {...register(`adHocAvailability.${month}`)}>
                            {[1, 2, 3, 4, 5].map((val) => (
                              <Radio key={val} value={val} size="small" />
                            ))}
                          </RadioGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </FormGroup>
          
          {errors.isLongTermMentor && <FormHelperText error>{errors.isLongTermMentor.message as string}</FormHelperText>}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Calendly schedule link *</Typography>
          <TextField fullWidth placeholder="https://calendly.com/yourname" {...register("calendlyLink")} error={!!errors.calendlyLink} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>What kind of Mentee are you looking for? *</Typography>
          <TextField fullWidth multiline rows={3} {...register("menteeExpectations")} error={!!errors.menteeExpectations} />
        </Grid>

        <Grid item xs={12}>
          <FormControl error={!!errors.openToNonWomen}>
            <FormLabel sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.875rem', mb: 1 }}>
              Are you open to mentoring individuals who do not identify as women? *
            </FormLabel>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio {...register("openToNonWomen")} />} label="Yes" />
              <FormControlLabel value="no" control={<Radio {...register("openToNonWomen")} />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1BasicInfo;