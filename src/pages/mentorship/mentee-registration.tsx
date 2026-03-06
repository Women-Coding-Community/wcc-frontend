import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  menteeFormDefaultValues,
  menteeFormSchema,
  MenteeFormData,
} from '@schemas/menteeSchema';
import MenteeStep1BasicInfo from 'components/mentorship/MenteeStep1BasicInfo';
import MenteeStep2Skills from 'components/mentorship/MenteeStep2Skills';
import MenteeStep3Applications from 'components/mentorship/MenteeStep3Applications';
import { MentorOption } from 'components/mentorship/MentorApplicationCard';

const TOTAL_STEPS = 3;

const validateStep1 = async (formMethods: ReturnType<typeof useForm>) =>
  formMethods.trigger([
    'fullName',
    'email',
    'slackDisplayName',
    'city',
    'position',
    'availableHsMonth',
    'mentorshipType',
  ]);

const validateStep2 = async (formMethods: ReturnType<typeof useForm>) =>
  formMethods.trigger([
    'skills.yearsExperience',
    'skills.areas',
    'skills.languages',
    'skills.mentorshipFocus',
    'spokenLanguages',
    'bio',
  ]);

const MenteeRegistrationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formMethods = useForm<MenteeFormData>({
    resolver: zodResolver(menteeFormSchema),
    defaultValues: menteeFormDefaultValues,
    mode: 'onChange',
  });

  const [activeStep, setActiveStep] = useState(1);
  const [mentors, setMentors] = useState<MentorOption[]>([]);

  useEffect(() => {
    fetch('/api/mentors')
      .then((res) => res.json())
      .then((data) => {
        const mentorList: MentorOption[] = (data.mentors ?? data ?? []).map(
          (m: { id: number; fullName: string; position?: string }) => ({
            id: m.id,
            fullName: m.fullName,
            position: m.position,
          }),
        );
        setMentors(mentorList);
      })
      .catch(() => {
        // silently fall back to empty list — user can still submit if API is down
      });
  }, []);

  const handleNext = async () => {
    let isValid;
    if (activeStep === 1) isValid = await validateStep1(formMethods);
    else if (activeStep === 2) isValid = await validateStep2(formMethods);
    else isValid = true;

    if (isValid && activeStep < TOTAL_STEPS) {
      setActiveStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const onSubmit = async (data: MenteeFormData) => {
    const networkLinks = data.network ?? [];
    if (data.linkedInProfile) {
      networkLinks.push({
        type: 'LINKEDIN' as const,
        link: data.linkedInProfile,
      });
    }

    const payload = {
      mentee: {
        fullName: data.fullName,
        position: data.position,
        email: data.email,
        slackDisplayName: data.slackDisplayName,
        country: data.country ?? { countryCode: '', countryName: '' },
        city: data.city,
        companyName: data.companyName ?? '',
        pronouns: data.pronouns ?? '',
        pronounCategory: data.pronounCategory,
        images: [],
        network: networkLinks,
        skills: data.skills,
        spokenLanguages: data.spokenLanguages,
        bio: data.bio,
        availableHsMonth: data.availableHsMonth,
      },
      mentorshipType: data.mentorshipType,
      applications: data.applications.map((app, idx) => ({
        mentorId: app.mentorId,
        priorityOrder: app.priorityOrder ?? idx + 1,
        whyMentor: app.whyMentor,
        applicationMessage: app.applicationMessage ?? '',
      })),
    };

    // eslint-disable-next-line no-console
    console.log('Mentee registration payload:', payload);
    // TODO: replace with real API call once backend endpoint is confirmed
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'white',
          py: 2,
          px: { xs: 2, sm: 3, md: '157px' },
        }}
      >
        <Breadcrumbs>
          <Link href="/" color="primary" underline="always">
            Home
          </Link>
          <Link href="/mentorship" color="primary" underline="always">
            Mentorship
          </Link>
          <Typography color="text.primary">Mentee Registration</Typography>
        </Breadcrumbs>
      </Box>

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
              pt: { xs: 4, sm: 6, md: 8 },
              px: { xs: 2, sm: 3 },
              maxWidth: isMobile ? '100%' : theme.custom?.innerBox?.maxWidth,
              margin: '0 auto',
            }}
          >
            <Box
              component="img"
              src="/mentee-form-bg.png"
              alt=""
              aria-hidden
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: { xs: '180px', sm: '240px', md: '320px' },
                width: 'auto',
                zIndex: -1,
                opacity: 0.6,
                pointerEvents: 'none',
              }}
            />

            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: 2,
                width: '100%',
                maxWidth: { xs: '100%', sm: '600px', md: '744px' },
                mx: 'auto',
                bgcolor: 'white',
              }}
            >
              {/* Progress */}
              <Typography
                variant="body2"
                align="center"
                sx={{ mb: 2, color: 'text.secondary' }}
              >
                Step {activeStep} of {TOTAL_STEPS}
              </Typography>
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
                    width: `${(activeStep / TOTAL_STEPS) * 100}%`,
                    height: '100%',
                    bgcolor: 'primary.main',
                    borderRadius: 3,
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>

              {/* Step content */}
              <Box>
                {activeStep === 1 && <MenteeStep1BasicInfo />}
                {activeStep === 2 && <MenteeStep2Skills />}
                {activeStep === 3 && (
                  <MenteeStep3Applications mentors={mentors} />
                )}
              </Box>

              {/* Navigation */}
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
                  sx={{ px: { xs: 2.5, md: 3.5 }, py: 1 }}
                >
                  Back
                </Button>

                {activeStep === TOTAL_STEPS ? (
                  <Button
                    variant="contained"
                    color="success"
                    disabled={formMethods.formState.isSubmitting}
                    onClick={formMethods.handleSubmit(onSubmit)}
                    sx={{ px: { xs: 2.5, md: 3.5 }, py: 1 }}
                  >
                    {formMethods.formState.isSubmitting
                      ? 'Submitting…'
                      : 'Submit Application'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ px: { xs: 2.5, md: 3.5 }, py: 1 }}
                  >
                    Next
                  </Button>
                )}
              </Stack>

              {/* Code of conduct note */}
              {activeStep === 1 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    By submitting, you agree to our{' '}
                    <NextLink
                      href="/mentorship/code-of-conduct"
                      style={{ color: 'inherit', textDecoration: 'underline' }}
                    >
                      Mentee Code of Conduct
                    </NextLink>
                    .
                  </Typography>
                </Box>
              )}
            </Paper>
          </Container>
        </Box>
      </FormProvider>
    </>
  );
};

export default MenteeRegistrationPage;
