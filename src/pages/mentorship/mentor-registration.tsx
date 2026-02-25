import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container, Paper, Typography, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import Step1BasicInfo from '../../components/mentorship/Step1BasicInfo';
import Step2Skills from '../../components/mentorship/Step2Skills';
import Step3DomainSkills from 'components/mentorship/Step3DomainSkills';
import Step4ProgrammingSkills from 'components/mentorship/Step4ProgrammingSkills';

import { mentorRegistrationSchema, MentorRegistrationData } from '../../schemas/mentorSchema';
import Step5Review from 'components/mentorship/Step5Review';

const validateStep1 = async (formMethods: any) => {
  const isStandardValid = await formMethods.trigger([
    'firstName', 'email', 'slackName', 'country', 'city',
    'jobTitle', 'company', 'calendlyLink', 'menteeExpectations', 'openToNonWomen',
  ]);

  const isLongTerm = formMethods.getValues('isLongTermMentor');
  const isAdHoc = formMethods.getValues('isAdHocMentor');

  formMethods.clearErrors(['isLongTermMentor', 'maxMentees', 'adHocAvailability']);
  
  let isTypeValid = true;

  if (!isLongTerm && !isAdHoc) {
    formMethods.setError('isLongTermMentor', { 
      type: 'manual', 
      message: 'Please select at least one mentorship format.' 
    });
    isTypeValid = false;
  }

  if (isLongTerm) {
    const maxMentees = formMethods.getValues('maxMentees');
    if (!maxMentees) {
      formMethods.setError('maxMentees', { 
        type: 'manual', 
        message: 'Please select the number of mentees' 
      });
      isTypeValid = false;
    }
  }

  if (isAdHoc) {
    const adHoc = formMethods.getValues('adHocAvailability');
    if (!adHoc || Object.keys(adHoc).length === 0) {
      formMethods.setError('adHocAvailability', { 
        type: 'manual', 
        message: 'Please select availability for at least one month' 
      });
      isTypeValid = false;
    }
  }

  return isStandardValid && isTypeValid;
};

const validateStep2 = async (formMethods: any) => {
  return await formMethods.trigger([
    'languages', 'yearsOfExperience', 'bio', 
    'mentoringTopics', 'photoSource', 'customPhotoUrl'
  ] as const);
};

const validateStep5 = async (formMethods: any) => {
  return await formMethods.trigger([
    'linkedin', 'identity', 'pronouns', 
    'socialHighlight', 'termsAgreed'
  ]);
};

const MentorRegistrationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formMethods = useForm({
    resolver: zodResolver(mentorRegistrationSchema),
    mode: 'onChange',
  });

  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 5;

  const handleNext = async () => {
    let isStepValid = false;

    switch (activeStep) {
      case 1:
        isStepValid = await validateStep1(formMethods);
        break;
      case 2:
        isStepValid = await validateStep2(formMethods);
        break;
      case 3:
      case 4:
        isStepValid = true;
        break;
      case 5:
        isStepValid = await validateStep5(formMethods);
        break;
      default:
        break;
    }

    if (isStepValid && activeStep < totalSteps) {
      setActiveStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep(prev => prev - 1);
  };

  const onSubmit = (data: MentorRegistrationData) => {
    console.log('Form Data Submitted:', data);
  };

  return (
    <FormProvider {...formMethods}>
      <Box 
        sx={{ 
          minHeight: '100vh',
          bgcolor: 'custom.lightBlue',
          position: 'relative',
          overflow: 'hidden',
          pb: 8,
        }}
      >
        <Container 
          maxWidth={false}
          sx={{ 
            position: 'relative',
            zIndex: 1,
            pt: { xs: 4, sm: 10, md: '18.75rem' },
            px: { xs: 2, sm: 3 },
            maxWidth: isMobile ? '100%' : theme.custom.innerBox.maxWidth,
            margin: '0 auto',
          }}
        >
        
          <Box
            component="img"
            src="/mentor-hero-bg.png"
            alt="Mentor background"
            sx={{
              position: 'absolute',
              top: '-6.25rem',
              right: 0,
              height: { xs: '220px', sm: '280px', md: '360px', lg: '420px' },
              width: 'auto',
              zIndex: -1,
              opacity: 0.9,
              pointerEvents: 'none',
            }}
          />
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 2,
              width: '100%',
              maxWidth: { xs: '100%', sm: '540px', md: '640px' },
              mx: 'auto',
              bgcolor: 'white',
            }}
          >
            <Typography 
              variant="body2" 
              align="center" 
              sx={{ 
                mb: 3,
                color: 'text.secondary',
              }}
            >
              Step {activeStep} of {totalSteps}
            </Typography>

            <Box 
              sx={{ 
                width: '100%', 
                height: 6, 
                bgcolor: '#E5E5E5', 
                borderRadius: 3, 
                mb: 5,
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  width: `${(activeStep / totalSteps) * 100}%`,
                  height: '100%',
                  bgcolor: 'primary.main',
                  borderRadius: 3,
                  transition: 'width 0.3s ease',
                }}
              />
            </Box>

            <Box>
              {activeStep === 1 && <Step1BasicInfo />}
              {activeStep === 2 && <Step2Skills />}
              {activeStep === 3 && <Step3DomainSkills />}
              {activeStep === 4 && <Step4ProgrammingSkills />}
              {activeStep === 5 && <Step5Review />}
            </Box>

            <Stack 
              direction="row" 
              justifyContent="space-between" 
              mt={5}
              spacing={2}
            >
              <Button 
                variant="outlined" 
                disabled={activeStep === 1} 
                onClick={handleBack}
                sx={{
                  px: { xs: 2.5, md: 3.5 },
                  py: 1,
                }}
              >
                Back
              </Button>

              {activeStep === totalSteps ? (
                <Button 
                  variant="contained" 
                  color="success" 
                  onClick={formMethods.handleSubmit(onSubmit)}
                  sx={{
                    px: { xs: 2.5, md: 3.5 },
                    py: 1,
                  }}
                >
                  Submit Application
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  onClick={handleNext}
                  sx={{
                    px: { xs: 2.5, md: 3.5 },
                    py: 1,
                  }}
                >
                  Next
                </Button>
              )}
            </Stack>
          </Paper>
        </Container>
      </Box>
    </FormProvider>
  );
};

export default MentorRegistrationPage;
