import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { 
  MenuItem, Typography, Box, TextField 
} from '@mui/material';
import { inputStyle, boldLabelStyle, sectionHeaderStyle } from './mentorshipStyles';
import StepSection from './StepSection';

const SKILL_LEVELS = [
  'Expert',
  'Proficient',
  'Experienced',
  'Familiar',
  'Not Applicable'
];

const DOMAIN_GROUPS = [
  {
    title: "AI, Data & ML",
    fields: [
      { name: 'dataEngineering', label: 'Data Engineering' },
      { name: 'dataScience', label: 'Data Science' },
      { name: 'genAI', label: 'Generative AI and LLMs' },
      { name: 'machineLearning', label: 'Machine Learning and AI' },
      { name: 'mlOps', label: 'MLOps and AI Deployment' },
    ]
  },
  {
    title: "Infrastructure & Operations",
    fields: [
      { name: 'cloudComputing', label: 'Cloud Computing' },
      { name: 'devOps', label: 'DevOps' },
      { name: 'networkEngineering', label: 'Network Engineering' },
      { name: 'platformEngineering', label: 'Platform Engineering' },
      { name: 'security', label: 'Security and Cybersecurity' },
      { name: 'sre', label: 'Site Reliability Engineering' },
    ]
  },
  {
    title: "Product, Leadership & Delivery",
    fields: [
      { name: 'agile', label: 'Agile and Scrum Practices' },
      { name: 'businessAnalysis', label: 'Business Analysis' },
      { name: 'engineeringMgmt', label: 'Engineering Management' },
      { name: 'productMgmt', label: 'Product Management' },
      { name: 'projectMgmt', label: 'Project Management' },
      { name: 'technicalLeadership', label: 'Technical Leadership' },
    ]
  },
  {
    title: "Software Development",
    fields: [
      { name: 'backend', label: 'Backend Development' },
      { name: 'frontend', label: 'Frontend Development' },
      { name: 'fullstack', label: 'Fullstack Development' },
      { name: 'mobileAndroid', label: 'Mobile Development - Android' },
      { name: 'mobileIos', label: 'Mobile Development - iOS' },
      { name: 'qaAutomation', label: 'QA and Test Automation' },
      { name: 'systemDesign', label: 'System Design and Software Architecture' },
    ]
  },
];

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
