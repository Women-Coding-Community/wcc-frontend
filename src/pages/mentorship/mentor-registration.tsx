// path: /mentorship/mentor-registration

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container, Paper, Typography, Button, Stack } from '@mui/material';

import { mentorRegistrationSchema, MentorRegistrationData } from '../../schemas/mentorSchema'

const MentorRegistrationPage = () => {
  const formMethods = useForm<MentorRegistrationData>({
    resolver: zodResolver(mentorRegistrationSchema),
    mode: 'onChange',
  });

  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 6;

  const handleNext = async () => {
    if (activeStep < totalSteps) {
      setActiveStep((prev) => prev + 1);
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
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', pb: 8, pt: '5.625rem' }}>
        <Container maxWidth="sm" sx={{ m: 0, ml: { xs: 2, md: '157px' } }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
              Mentor Registration
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
              Step {activeStep} of {totalSteps}
            </Typography>
            <Box sx={{ width: '100%', height: 8, bgcolor: '#e0e0e0', borderRadius: 4, mb: 6 }}>
              <Box 
                sx={{ 
                  width: `${(activeStep / totalSteps) * 100}%`, 
                  height: '100%', 
                  bgcolor: '#1976d2', 
                  borderRadius: 4,
                  transition: 'width 0.3s ease'
                }} 
              />
            </Box>
            <Box sx={{ minHeight: '300px', py: 2 }}>
              <Typography align="center" sx={{ mt: 8, color: 'gray' }}>
                Screen <strong>{activeStep}</strong> Content
              </Typography>
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
