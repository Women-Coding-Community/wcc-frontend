import React from 'react';
import { 
  Typography, Box 
} from '@mui/material';
import { boldLabelStyle, sectionHeaderStyle } from './mentorshipStyles';
import StepSection from './StepSection';
import { DOMAIN_GROUPS, SKILL_LEVELS } from '../../utils/mentorshipConstants';
import { MentorshipSelect } from './MentorshipSelect';

const Step3DomainSkills = () => {

  return (
    <StepSection
      title="Please select your experience level for each skill or topic."
      description="Choose the option that best reflects your background — none are mandatory. Choose the skills you can help your mentee with. Mark your preference from Expert to Not Applicable."
    >
      <Box sx={{ maxWidth: '100%' }}> 
        {DOMAIN_GROUPS.map((group) => (
          <Box key={group.title}>
            <Typography variant="h6" sx={sectionHeaderStyle}>
              {group.title}
            </Typography>

            {group.fields.map((skill) => (
              <Box key={skill.name}>
                <Typography variant="subtitle2" sx={boldLabelStyle}>
                  {skill.label}
                </Typography>                
                <MentorshipSelect 
                  name={skill.name} 
                  options={SKILL_LEVELS} 
                />
              </Box>
            ))}
          </Box>
        ))}

        <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Page 3 of 6
          </Typography>
        </Box>
      </Box>
    </StepSection>
  );
};

export default Step3DomainSkills;
