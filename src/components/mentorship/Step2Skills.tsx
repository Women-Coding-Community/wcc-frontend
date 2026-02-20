import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { 
  Grid, TextField, MenuItem, Typography, Box, 
  RadioGroup, FormControlLabel, Radio, 
  Select, Checkbox, ListItemText, OutlinedInput 
} from '@mui/material';
import StepSection from './StepSection';

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F5F5F5', 
    borderRadius: '4px',
    '& fieldset': { border: 'none' }, 
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: '1px solid #333' }, 
  },
  '& .MuiInputBase-input': { padding: '12px 14px' }
};

const boldLabelStyle = {
  fontWeight: 700, color: '#1B1919', mb: 0.5, display: 'block', fontSize: '16px', fontFamily: 'Roboto'
};

const helperTextStyle = {
  fontSize: '12px', color: '#666', mt: 1, lineHeight: 1.5
};

const LANGUAGES = ['English', 'Spanish', 'Russian', 'Polish', 'Ukrainian', 'French', 'Portuguese', 'Other'];
const EXPERIENCE = ['0–2 years', '3–5 years', '6–10 years', '10+ years'];

const Step2Skills = () => {
  const { register, watch, control, formState: { errors } } = useFormContext();
  const photoSource = watch('photoSource'); 

  return (
    <StepSection
      title="Skills"
      description="In this section, please share the skills and expertise you can offer as a mentor. This helps mentees find the right guidance that aligns with their career goals."
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>Which languages do you speak? *</Typography>
          <Controller
            name="languages"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Select
                {...field}
                multiple
                displayEmpty
                fullWidth
                error={!!errors.languages}
                input={<OutlinedInput sx={inputStyle} />}
                renderValue={(selected) => {
                  if (selected.length === 0) return <span style={{ color: '#aaa' }}>Choose as many as you like</span>;
                  return selected.join(', ');
                }}
              >
                {LANGUAGES.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    <Checkbox checked={field.value.includes(lang)} />
                    <ListItemText primary={lang} />
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.languages && (
            <Typography variant="caption" color="error">{errors.languages.message as string}</Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>How many years of experience do you have in tech? *</Typography>
          <TextField
            select
            fullWidth
            defaultValue=""
            {...register('yearsOfExperience')}
            error={!!errors.yearsOfExperience}
            helperText={errors.yearsOfExperience?.message as string}
            sx={inputStyle}
          >
            {EXPERIENCE.map((exp) => (
              <MenuItem key={exp} value={exp}>{exp}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>
            Please share a brief summary of your professional background and expertise. *
          </Typography>
          <Box sx={{ mb: 1, ml: 2 }}>
            <Typography variant="body2" sx={{ fontSize: '14px', color: '#555' }}>
              You may include:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#555' }}>
              <li>Areas of expertise and specializations</li>
              <li>Years of experience</li>
              <li>Notable achievements or certifications</li>
              <li>Successful projects or career highlights</li>
            </ul>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            {...register('bio')}
            error={!!errors.bio}
            helperText={errors.bio?.message as string}
            sx={inputStyle}
          />
          <Typography sx={helperTextStyle}>
            This information will be displayed in your mentor profile on the programme website and serve as your personal introduction to mentees
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>
            List potential mentoring topics you can discuss with your mentee
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontSize: '14px', color: '#555' }}>
            Software Development Strategies, Resume Review, Preparation for The Technical Interview etc.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            {...register('mentoringTopics')}
            error={!!errors.mentoringTopics}
            sx={inputStyle}
          />
          <Typography sx={helperTextStyle}>
            This information will be displayed in your mentor profile on the programme website.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={boldLabelStyle}>
            Which photo should we use to show your profile as a mentor on our website? *
          </Typography>
          
          <Controller
            name="photoSource"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel value="linkedin" control={<Radio sx={{ '&.Mui-checked': { color: 'black' } }} />} label="Linked In" />
                <FormControlLabel value="slack" control={<Radio sx={{ '&.Mui-checked': { color: 'black' } }} />} label="Slack" />
                <FormControlLabel value="other" control={<Radio sx={{ '&.Mui-checked': { color: 'black' } }} />} label="Image link from a public profile" />
              </RadioGroup>
            )}
          />
          {errors.photoSource && (
             <Typography variant="caption" color="error">{errors.photoSource.message as string}</Typography>
          )}

          {photoSource === 'other' && (
            <TextField
              fullWidth
              placeholder="Link"
              {...register('customPhotoUrl')}
              error={!!errors.customPhotoUrl}
              helperText={errors.customPhotoUrl?.message as string}
              sx={{ ...inputStyle, mt: 2 }}
            />
          )}
        </Grid>
      </Grid>
    </StepSection>
  );
};

export default Step2Skills;
