// path: /mentorship/mentor-registration

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container, Paper, Typography, Button, Stack } from '@mui/material';
import Step1BasicInfo from '../../components/mentorship/Step1BasicInfo';

import { mentorRegistrationSchema, MentorRegistrationData } from '../../schemas/mentorSchema'

const MentorRegistrationPage = () => {
  const formMethods = useForm<MentorRegistrationData>({
    resolver: zodResolver(mentorRegistrationSchema),
    mode: 'onChange',
  });

  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 6;

const handleNext = async () => {
    let isStepValid = false;

    if (activeStep === 1) {
      isStepValid = await formMethods.trigger([
        "firstName", 
        "email", 
        "slackName", 
        "country", 
        "jobTitle", 
        "company",
        "isLongTermMentor",
        "isAdHocMentor",
        "maxMentees",
        "adHocAvailability",
        "calendlyLink",
        "menteeExpectations",
        "openToNonWomen"
      ]);
    } else {
      isStepValid = true;
    }

    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
      window.scrollTo(0, 0); 
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const onSubmit = (data: MentorRegistrationData) => {
    console.log("Form Data:", data);
    alert("Check console for form data!");
  };

  return (
    <FormProvider {...formMethods}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'custom.softGray', pb: 8, pt: '5.625rem' }}>
        <Container maxWidth="sm" sx={{ m: 0, ml: { xs: 2, md: '157px' } }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
              Step {activeStep} of {totalSteps}
            </Typography>
            <Box sx={{ width: '100%', height: 8, bgcolor: '#e0e0e0', borderRadius: 4, mb: 6 }}>
              <Box 
                sx={{ 
                  width: `${(activeStep / totalSteps) * 100}%`, 
                  height: '100%', 
                  bgcolor: 'primary.main',
                  borderRadius: 4,
                  transition: 'width 0.3s ease'
                }} 
              />
            </Box>
            <Box sx={{ minHeight: '300px', py: 2 }}>
            {activeStep === 1 && <Step1BasicInfo />}
            {activeStep > 1 && (
              <Typography align="center" sx={{ mt: 8, color: 'gray' }}>
                Screen <strong>{activeStep}</strong> Content (Coming Soon)
              </Typography>
            )}
          </Box>
            <Stack direction="row" justifyContent="space-between" mt={4}>
              <Button 
                variant="outlined"
                disabled={activeStep === 1} 
                onClick={handleBack}
              >
                Back
              </Button>
              
              {activeStep === totalSteps ? (
                <Button variant="contained" color="success" onClick={formMethods.handleSubmit(onSubmit)}>
                  Submit Application
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
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
