import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container, Paper, Typography, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import Step1BasicInfo from '../../components/mentorship/Step1BasicInfo';
import { mentorRegistrationSchema, MentorRegistrationData } from '../../schemas/mentorSchema';

const MentorRegistrationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formMethods = useForm({
    resolver: zodResolver(mentorRegistrationSchema),
    mode: 'onChange',
  });

  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 6;

  const handleNext = async () => {
    let isStepValid = false;

    if (activeStep === 1) {
      isStepValid = await formMethods.trigger([
        'firstName',
        'email',
        'slackName',
        'country',
        'jobTitle',
        'company',
        'isLongTermMentor',
        'isAdHocMentor',
        'maxMentees',
        'adHocAvailability',
        'calendlyLink',
        'menteeExpectations',
        'openToNonWomen',
      ]);
    } else {
      isStepValid = true;
    }

    if (isStepValid) {
      setActiveStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep(prev => prev - 1);
  };

  const onSubmit = (data: MentorRegistrationData) => {
    console.log('Form Data:', data);
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
              {activeStep > 1 && (
                <Box sx={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography align="center" sx={{ color: 'text.secondary' }}>
                    Screen <strong>{activeStep}</strong> Content (Coming Soon)
                  </Typography>
                </Box>
              )}
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