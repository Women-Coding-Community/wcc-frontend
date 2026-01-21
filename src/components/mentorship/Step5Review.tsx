import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { 
  Grid, TextField, Typography, Box, Radio, RadioGroup, 
  FormControlLabel, FormControl, FormHelperText, Checkbox, 
  Accordion, AccordionSummary, AccordionDetails, Link
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StepSection from './StepSection';

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'custom.softGray', 
    borderRadius: '4px',
    '& fieldset': { border: 'none' }, 
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { 
      border: '1px solid',
      borderColor: 'text.primary' 
    }, 
  },
  '& .MuiInputBase-input': { 
    padding: '16px 14px',
    fontSize: '16px',
    color: 'text.primary'
  },
};

const boldLabelStyle = {
  fontWeight: 600, 
  color: 'text.primary', 
  mb: 1, 
  display: 'block', 
  fontSize: '15px', 
  fontFamily: 'Roboto'
};

const accordionStyle = {
  backgroundColor: 'custom.softGray',
  boxShadow: 'none',
  borderRadius: '4px !important',
  '&:before': { display: 'none' },
  mb: 3
};

const Step5Review = () => {
  const { register, control, formState: { errors } } = useFormContext();

  return (
    <StepSection
      title="These links will be visible in your profile section on the website"
    >
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>
            LinkedIn <Box component="span" sx={{ color: 'error.main' }}>*</Box>
          </Typography>
          <TextField
            fullWidth
            placeholder="https://linkedin.com/in/..."
            {...register("linkedin")}
            error={!!errors.linkedin}
            helperText={errors.linkedin?.message as string}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>
            Other social media
          </Typography>
          
          <Accordion sx={accordionStyle}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="social-media-content"
              id="social-media-header"
              sx={{ minHeight: '56px' }}
            >
              <Typography>Other social media</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pb: 3 }}>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={boldLabelStyle}>Github</Typography>
                <TextField fullWidth {...register("github")} sx={inputStyle} error={!!errors.github} helperText={errors.github?.message as string} />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={boldLabelStyle}>Instagram</Typography>
                <TextField fullWidth {...register("instagram")} sx={inputStyle} error={!!errors.instagram} helperText={errors.instagram?.message as string} />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={boldLabelStyle}>Medium</Typography>
                <TextField fullWidth {...register("medium")} sx={inputStyle} error={!!errors.medium} helperText={errors.medium?.message as string} />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={boldLabelStyle}>Website</Typography>
                <TextField fullWidth {...register("website")} sx={inputStyle} error={!!errors.website} helperText={errors.website?.message as string} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={boldLabelStyle}>Other</Typography>
                <TextField fullWidth {...register("otherSocial")} sx={inputStyle} />
              </Box>

            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <FormControl error={!!errors.identity}>
            <Typography variant="subtitle2" sx={boldLabelStyle}>
              Do you identify as a woman or non-binary? <Box component="span" sx={{ color: 'error.main' }}>*</Box>
            </Typography>
            <Controller
              name="identity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel value="Yes" control={<Radio sx={{ color: 'text.primary', '&.Mui-checked': { color: 'text.primary' } }} />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio sx={{ color: 'text.primary', '&.Mui-checked': { color: 'text.primary' } }} />} label="No" />
                  <FormControlLabel value="Prefer not to say" control={<Radio sx={{ color: 'text.primary', '&.Mui-checked': { color: 'text.primary' } }} />} label="Prefer not to say" />
                </RadioGroup>
              )}
            />
            <FormHelperText>{errors.identity?.message as string}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>
            What are your preferred pronouns? e.g., he/him, she/her, they/them <Box component="span" sx={{ color: 'error.main' }}>*</Box>
          </Typography>
          <TextField
            fullWidth
            {...register("pronouns")}
            error={!!errors.pronouns}
            sx={inputStyle}
          />
          <FormHelperText sx={{ mt: 0.5 }}>
            We ask for your pronouns to ensure we address you correctly and respectfully.
          </FormHelperText>
          {errors.pronouns && (
             <FormHelperText error>{errors.pronouns.message as string}</FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <FormControl error={!!errors.socialHighlight}>
            <Typography variant="subtitle2" sx={boldLabelStyle}>
              Are you happy for us to highlight/promote you as our mentor on our social media? <Box component="span" sx={{ color: 'error.main' }}>*</Box>
            </Typography>
            <Controller
              name="socialHighlight"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel value="Yes" control={<Radio sx={{ color: 'text.primary', '&.Mui-checked': { color: 'text.primary' } }} />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio sx={{ color: 'text.primary', '&.Mui-checked': { color: 'text.primary' } }} />} label="No" />
                </RadioGroup>
              )}
            />
            <FormHelperText>
              Please make sure your details are always up to date on our website.
            </FormHelperText>
            {errors.socialHighlight && (
               <FormHelperText error>{errors.socialHighlight.message as string}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            By selecting the checkbox below, you confirm that you:
          </Typography>
          
          <Box component="ul" sx={{ pl: 2, mb: 2, typography: 'body2', color: 'text.primary' }}>
            <li style={{ marginBottom: '8px' }}>
              Have read and agree to the <Link href="https://www.womencodingcommunity.com/code-of-conduct" target="_blank" rel="noopener noreferrer" underline="always" sx={{ color: 'custom.linkBlue' }}>code of conduct</Link>{' '} and the {' '}<Link href="https://www.womencodingcommunity.com/mentorship-code-of-conduct" target="_blank" rel="noopener noreferrer" underline="always" sx={{ color: 'custom.linkBlue' }}>mentorship code of conduct</Link>.
            </li>
            <li style={{ marginBottom: '8px' }}>
              Grant Women Coding Community permission to store my contact information, use it to reach out to me, and publish mine mentor profile on the community's website.
            </li>
            <li>
              I hereby grant the Women Coding Community the right to store the above-mentioned contact details to contact me and include my mentor profile on our website.
            </li>
          </Box>

          <FormControl error={!!errors.termsAgreed}>
            <FormControlLabel 
              control={
                <Controller
                  name="termsAgreed"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox 
                      {...field} 
                      checked={field.value} 
                      sx={{ color: 'text.primary', '&.Mui-checked': { color: 'text.primary' } }} 
                    />
                  )}
                />
              } 
              label={
                <Typography variant="body2">
                  I accept and agree to the above terms <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                </Typography>
              } 
            />
            <FormHelperText>{errors.termsAgreed?.message as string}</FormHelperText>
          </FormControl>
        </Grid>

      </Grid>

      <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Page 5 of 5
        </Typography>
      </Box>
    </StepSection>
  );
};

export default Step5Review;
