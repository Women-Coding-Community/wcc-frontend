import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { 
  MenuItem, Typography, Box, TextField, Divider 
} from '@mui/material';
import { inputStyle, boldLabelStyle, sectionHeaderStyle } from './mentorshipStyles';
import StepSection from './StepSection';

const PREFERENCE_LEVELS = [
  'Low',
  'Medium',
  'High',
  'Not Applicable'
];

const CAREER_GOALS = [
  { name: 'careerSwitch', label: 'Switch career to IT' },
  { name: 'beginnerToMid', label: 'Grow from beginner to mid-level' },
  { name: 'midToSenior', label: 'Grow from mid-level to senior-level' },
  { name: 'seniorPlus', label: 'Grow beyond senior level' },
  { name: 'icToManager', label: 'Switch from IC to management position' },
  { name: 'specialisationSwitch', label: 'Change specialisation within IT' },
];

const PROGRAMMING_LANGUAGES = [
  { name: 'c', label: 'C' },
  { name: 'cSharp', label: 'C#' },
  { name: 'go', label: 'Go' },
  { name: 'java', label: 'Java' },
  { name: 'javascript', label: 'JavaScript' },
  { name: 'kotlin', label: 'Kotlin' },
  { name: 'python', label: 'Python' },
  { name: 'rust', label: 'Rust' },
  { name: 'scala', label: 'Scala' },
  { name: 'sql', label: 'SQL' },
  { name: 'swift', label: 'Swift' },
  { name: 'typescript', label: 'TypeScript' },
];

const Step4ProgrammingSkills = () => {
  const { control } = useFormContext();

  return (
    <StepSection
      title="Please, indicate your preference in helping your mentee to achieve the following goals *"
      description="Choose the option that best reflects your preference. None are mandatory."
    >
      <Box sx={{ maxWidth: '100%' }}>
        
        {CAREER_GOALS.map((goal) => (
          <Box key={goal.name}>
            <Typography variant="subtitle2" sx={boldLabelStyle}>
              {goal.label}
            </Typography>
            <Controller
              name={goal.name}
              control={control}
              defaultValue="Not Applicable"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  sx={inputStyle}
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected: any) => {
                      if (!selected) return "Not Applicable";
                      return selected;
                    }
                  }}
                >
                  {PREFERENCE_LEVELS.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        ))}

        <Divider sx={{ my: 4, borderColor: 'grey.300' }} />

        <Box>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
            Add programming languages you can help your mentee with. 
            Mark your preference from Expert to Not Applicable. <Box component="span" sx={{ color: 'error.main' }}>*</Box>
          </Typography>
          
          <Typography variant="h6" sx={sectionHeaderStyle}>
            Programming Languages:
          </Typography>

          {PROGRAMMING_LANGUAGES.map((lang) => (
            <Box key={lang.name}>
              <Typography variant="subtitle2" sx={boldLabelStyle}>
                {lang.label}
              </Typography>
              <Controller
                name={lang.name}
                control={control}
                defaultValue="Not Applicable"
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    sx={inputStyle}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (selected: any) => {
                        if (!selected) return "Not Applicable";
                        return selected;
                      }
                    }}
                  >
                    {PREFERENCE_LEVELS.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Page 4 of 6
          </Typography>
        </Box>

      </Box>
    </StepSection>
  );
};

export default Step4ProgrammingSkills;