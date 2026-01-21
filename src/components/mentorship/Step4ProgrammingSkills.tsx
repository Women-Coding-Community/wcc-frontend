import React from 'react';
import { 
  Typography, Box, Divider 
} from '@mui/material';
import { boldLabelStyle, sectionHeaderStyle } from './mentorshipStyles';
import StepSection from './StepSection';
import { CAREER_GOALS, PROGRAMMING_LANGUAGES, PREFERENCE_LEVELS } from '../../utils/mentorshipConstants';
import { MentorshipSelect } from './MentorshipSelect';

const Step4ProgrammingSkills = () => {

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
            <MentorshipSelect 
              name={goal.name} 
              options={PREFERENCE_LEVELS} 
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
              <MentorshipSelect 
                name={lang.name} 
                options={PREFERENCE_LEVELS} 
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
