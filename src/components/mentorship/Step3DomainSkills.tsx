import { Box, Typography } from '@mui/material';
import React from 'react';

import {
  PROFICIENCY_LEVELS,
  TECHNICAL_AREA_GROUPS,
} from '@utils/mentorshipConstants';

import SkillsWithProficiency from './SkillsWithProficiency';
import StepSection from './StepSection';

const Step3DomainSkills = () => (
  <StepSection
    title="Please select your proficiency level for each skill or topic."
    description="Choose the option that best reflects your background — none are mandatory. Only areas where you select a proficiency level will be included in your profile."
  >
    <Box sx={{ maxWidth: '100%' }}>
      <SkillsWithProficiency
        name="technicalAreas"
        groups={TECHNICAL_AREA_GROUPS}
        proficiencyLevels={PROFICIENCY_LEVELS}
      />

      <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Page 3 of 5
        </Typography>
      </Box>
    </Box>
  </StepSection>
);

export default Step3DomainSkills;
