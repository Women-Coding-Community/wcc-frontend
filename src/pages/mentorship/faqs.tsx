// path: /mentorship/faqs

import { Typography, Box, Container } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import theme from 'theme';

import { FaqSection } from '../../components/FaqSection';
import { MentorshipPageData } from '../../utils/types';

interface FaqsPageProps {
  data: MentorshipPageData | null;
  error: string | null;
}

const MentorshipFaqsPage = ({ data, error }: FaqsPageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push('/500');
    }
  }, [error, router]);

  if (!data) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h6" color="error">
          An error occurred while loading the FAQ page.
        </Typography>
      </Container>
    );
  }

  const {
    heroSection,
    commonFaqSection,
    mentorsFaqSection,
    menteesFaqSection,
  } = data;

  return (
    <>
      <Box sx={{ ...theme.custom.containerBox, py: 0 }}>
        <Container maxWidth="md" sx={{ px: theme.spacing(2) }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              {heroSection.title}
            </Typography>
          </Box>
          <FaqSection
            title={commonFaqSection.title}
            items={commonFaqSection.items}
          />
          <FaqSection
            title={mentorsFaqSection.title}
            items={mentorsFaqSection.items}
          />
          <FaqSection
            title={menteesFaqSection.title}
            items={menteesFaqSection.items}
          />
        </Container>
      </Box>
    </>
  );
};

export default MentorshipFaqsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      data: null,
      error: null,
    },
  };
};
