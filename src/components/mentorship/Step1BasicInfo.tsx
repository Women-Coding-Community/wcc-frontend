import React from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  Grid, TextField, MenuItem, Typography, Box, FormHelperText,
  FormGroup, FormControlLabel, Checkbox, Radio, RadioGroup, FormControl, FormLabel,
  Table, TableBody, TableCell, TableHead, TableRow 
} from '@mui/material';

const sectionBoxStyle = {
  mt: 1, 
  p: 2, 
  bgcolor: '#F5F5F5',
  borderRadius: '4px'
};

const boldLabelStyle = {
  fontWeight: 700, 
  color: '#1B1919', 
  mb: 0.5,
  fontSize: '16px',
  fontFamily: 'Roboto'
};

const serifTitleStyle = {
  fontFamily: 'Domine, serif', 
  fontWeight: 700, 
  fontSize: '24px', 
  mb: 2, 
  color: '#1B1919'
};

const Step1BasicInfo = () => {
  const { register, watch, formState: { errors } } = useFormContext();  
  const isLongTerm = watch("isLongTermMentor");
  const isAdHoc = watch("isAdHocMentor");

  const months = ["May", "June", "July", "August", "September", "October", "November"];

  return (
    <Box>
      <Typography variant="h5" sx={serifTitleStyle}>
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
          <Typography variant="subtitle2" sx={boldLabelStyle}>What is your full name? *</Typography>
          <TextField fullWidth placeholder="Jane Doe" {...register("firstName")} error={!!errors.firstName} helperText={errors.firstName?.message as string} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>What is your email address? *</Typography>
          <TextField fullWidth type="email" placeholder="jane@example.com" {...register("email")} error={!!errors.email} helperText={errors.email?.message as string} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>Slack Name *</Typography>
          <TextField fullWidth placeholder="@jane" {...register("slackName")} error={!!errors.slackName} />
          <FormHelperText sx={{ mt: 1 }}>Please note your application will be rejected if you are not in our Slack community.</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>Location *</Typography>
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
          <Typography variant="subtitle2" sx={boldLabelStyle}>What is your current job title? *</Typography>
          <TextField fullWidth {...register("jobTitle")} error={!!errors.jobTitle} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>Company name *</Typography>
          <TextField fullWidth {...register("company")} error={!!errors.company} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: errors.isLongTermMentor ? 'error.main' : 'text.primary' }}>
            Which kind of mentor you want to be? *
          </Typography>
          
          <FormGroup>
            <FormControlLabel control={<Checkbox {...register("isLongTermMentor")} />} label="Long-Term Format" />
            
            {isLongTerm && (
              <Box sx={sectionBoxStyle}>
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
              <Box sx={sectionBoxStyle}>
                  <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 2, color: '#1B1919' }}>
                    For each month below, please indicate the maximum number of mentees you are available to support. <span style={{ color: '#D32F2F' }}>*</span>
                  </Typography>
                  <Table size="small" sx={{ '& td, & th': { borderBottom: 'none' } }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ pl: 0, width: '20%' }}></TableCell> 
                        {[1, 2, 3, 4, '5+'].map(num => (
                          <TableCell key={num} align="center" sx={{ fontWeight: 600, color: '#1B1919', pb: 2 }}>{num}</TableCell>
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
                                <Radio key={val} value={String(val)} size="small" sx={{ color: '#BDBDBD', '&.Mui-checked': { color: '#000000' } }} />
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
          <Typography variant="subtitle2" sx={boldLabelStyle}>Calendly schedule link *</Typography>
          <TextField fullWidth placeholder="https://calendly.com/yourname" {...register("calendlyLink")} error={!!errors.calendlyLink} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>What kind of Mentee are you looking for? *</Typography>
          <TextField fullWidth multiline rows={3} {...register("menteeExpectations")} error={!!errors.menteeExpectations} />
        </Grid>

        <Grid item xs={12}>
          <FormControl error={!!errors.openToNonWomen}>
            <Typography variant="subtitle2" sx={boldLabelStyle}>
              Are you open to mentoring individuals who do not identify as women? *
            </Typography>
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