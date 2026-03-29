import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Alert,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';

import Step1BasicInfo from 'components/mentorship/Step1BasicInfo';
import Step2Skills from 'components/mentorship/Step2Skills';
import Step3DomainSkills from 'components/mentorship/Step3DomainSkills';
import Step4ProgrammingSkills from 'components/mentorship/Step4ProgrammingSkills';
import Step5Review from 'components/mentorship/Step5Review';
import {
  mentorRegistrationSchema,
  MentorRegistrationData,
  mentorRegistrationDefaultValues,
} from 'schemas/mentorSchema';

const validateStep1 = async (formMethods: any) => {
  const isStandardValid = await formMethods.trigger([
    'fullName',
    'email',
    'slackDisplayName',
    'country',
    'city',
    'position',
    'companyName',
    'calendlyLink',
    'menteeExpectations',
    'openToNonWomen',
  ]);

  const isLongTerm = formMethods.getValues('isLongTermMentor');
  const isAdHoc = formMethods.getValues('isAdHocMentor');

  formMethods.clearErrors([
    'isLongTermMentor',
    'maxMentees',
    'adHocAvailability',
  ]);
  let isTypeValid = true;

  if (!isLongTerm && !isAdHoc) {
    formMethods.setError('isLongTermMentor', {
      type: 'manual',
      message: 'Please select at least one mentorship format.',
    });
    isTypeValid = false;
  }
  if (isLongTerm) {
    const maxMentees = formMethods.getValues('maxMentees');
    if (!maxMentees) {
      formMethods.setError('maxMentees', {
        type: 'manual',
        message: 'Please select the number of mentees',
      });
      isTypeValid = false;
    }
  }
  if (isAdHoc) {
    const adHoc = formMethods.getValues('adHocAvailability');
    if (!adHoc || Object.keys(adHoc).length === 0) {
      formMethods.setError('adHocAvailability', {
        type: 'manual',
        message: 'Please select availability for at least one month',
      });
      isTypeValid = false;
    }
  }
  return isStandardValid && isTypeValid;
};

const validateStep2 = async (formMethods: any) => {
  return await formMethods.trigger([
    'languages',
    'yearsExperience',
    'bio',
    'mentorshipFocus',
    'imageUrl',
  ]);
};

const validateStep3 = async (formMethods: any) => {
  return await formMethods.trigger(['technicalAreas']);
};

const validateStep4 = async (formMethods: any) => {
  return await formMethods.trigger(['codeLanguages', 'mentorshipFocusAreas']);
};

const validateStep5 = async (formMethods: any) => {
  return await formMethods.trigger([
    'linkedin',
    'identity',
    'pronouns',
    'socialHighlight',
    'termsAgreed',
  ]);
};

const MentorRegistrationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formMethods = useForm<MentorRegistrationData>({
    // Cast needed: z.coerce fields in Zod v4 produce `unknown` input types,
    // causing a Resolver mismatch; the runtime output is MentorRegistrationData.
    resolver: zodResolver(
      mentorRegistrationSchema,
    ) as Resolver<MentorRegistrationData>,
    defaultValues: mentorRegistrationDefaultValues,
    mode: 'onChange',
  });

  const [activeStep, setActiveStep] = useState(1);
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
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
        isStepValid = await validateStep3(formMethods);
        break;
      case 4:
        isStepValid = await validateStep4(formMethods);
        break;
      case 5:
        isStepValid = await validateStep5(formMethods);
        break;
      default:
        break;
    }

    if (isStepValid && activeStep < totalSteps) {
      setActiveStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data: MentorRegistrationData) => {
    setSubmissionStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/mentor-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit application');
      }

      setSubmissionStatus('success');
      window.scrollTo(0, 0);
    } catch (error: any) {
      setSubmissionStatus('error');
      setErrorMessage(
        error.message || 'Something went wrong. Please try again.',
      );
      window.scrollTo(0, 0);
    }
  };

  const onInvalid = () => {};

  if (submissionStatus === 'success') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'custom.lightBlue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 2,
            maxWidth: '540px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom color="success.main">
            Application Submitted!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Thank you for applying to be a mentor. Your application has been
            received and is now being reviewed. We will get back to you soon.
          </Typography>
          <Link href="/mentorship" passHref>
            <Button variant="contained" color="primary">
              Go to Mentorship Page
            </Button>
          </Link>
        </Paper>
      </Box>
    );
  }

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

            {submissionStatus === 'error' && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errorMessage}
              </Alert>
            )}

            <Box
              sx={{
                width: '100%',
                height: 6,
                bgcolor: '#E5E5E5',
                borderRadius: 3,
                mb: 5,
                overflow: 'hidden',
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
              alignItems="center"
              mt={5}
              spacing={2}
            >
              <Button
                variant="outlined"
                disabled={activeStep === 1 || submissionStatus === 'loading'}
                onClick={handleBack}
                sx={{
                  px: { xs: 2.5, md: 3.5 },
                  py: 1,
                }}
              >
                Back
              </Button>

              <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                {Object.keys(formMethods.formState.errors).length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography color="error" variant="subtitle2" gutterBottom>
                      Please fix the following validation errors:
                    </Typography>
                    <ul
                      style={{
                        textAlign: 'left',
                        color: theme.palette.error.main,
                        margin: '0 auto',
                        display: 'inline-block',
                      }}
                    >
                      {Object.entries(formMethods.formState.errors).map(
                        ([key, error]: [string, any]) => {
                          const label =
                            {
                              fullName: 'Full Name',
                              email: 'Email',
                              slackDisplayName: 'Slack Name',
                              country: 'Country',
                              city: 'City',
                              position: 'Position',
                              companyName: 'Company Name',
                              calendlyLink: 'Calendly Link',
                              menteeExpectations: 'Mentee Expectations',
                              openToNonWomen: 'Open to non-women',
                              isLongTermMentor: 'Mentorship Format',
                              maxMentees: 'Max Mentees',
                              adHocAvailability: 'Ad-hoc Availability',
                              languages: 'Languages',
                              yearsExperience: 'Years of Experience',
                              bio: 'Bio',
                              technicalAreas: 'Technical Areas',
                              codeLanguages: 'Programming Languages',
                              mentorshipFocusAreas: 'Mentorship Focus Areas',
                              linkedin: 'LinkedIn',
                              identity: 'Identity',
                              pronouns: 'Pronouns',
                              socialHighlight: 'Social Highlight',
                              termsAgreed: 'Terms Agreement',
                            }[key] || key;
                          return (
                            <li key={key}>
                              <Typography variant="caption">
                                <strong>{label}:</strong>{' '}
                                {error?.message || 'Invalid value'}
                              </Typography>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  </Box>
                )}
              </Box>

              {activeStep === totalSteps ? (
                <Button
                  variant="contained"
                  color="success"
                  disabled={submissionStatus === 'loading'}
                  onClick={formMethods.handleSubmit(onSubmit, onInvalid)}
                  sx={{
                    px: { xs: 2.5, md: 3.5 },
                    py: 1,
                    minWidth: '120px',
                  }}
                >
                  {submissionStatus === 'loading' ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Submit Application'
                  )}
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
