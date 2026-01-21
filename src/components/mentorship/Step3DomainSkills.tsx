import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { 
  MenuItem, Typography, Box, TextField 
} from '@mui/material';
import { inputStyle, boldLabelStyle, sectionHeaderStyle } from './mentorshipStyles';
import StepSection from './StepSection';
import { DOMAIN_GROUPS, SKILL_LEVELS } from '../../utils/mentorshipConstants';

const Step3DomainSkills = () => {
  const { control } = useFormContext();

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
                
                <Controller
                  name={skill.name}
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
                      {SKILL_LEVELS.map((level) => (
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
