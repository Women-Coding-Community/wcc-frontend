import { Typography, Box, Container } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

import { BreadCrumbsDynamic, FaqSection } from '@components';
import { useIsMobile } from '@utils/theme-utils';
import { fetchData } from 'lib/api';

import { MentorshipPageData } from '../../utils/types';

interface FaqsPageProps {
  data: MentorshipPageData;
}

const MentorshipFaqsPage = ({ data }: FaqsPageProps) => {
  const {
    heroSection,
    commonFaqSection,
    mentorsFaqSection,
    menteesFaqSection,
  } = data;

  const faqSections = [commonFaqSection, mentorsFaqSection, menteesFaqSection];
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? <BreadCrumbsDynamic /> : null}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to right, #9FCEEC, #C7E7FF)',
          width: '100%',
        }}
      >
        <Box sx={{ textAlign: 'center', py: '48px' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: '57px',
              lineHeight: 1.123,
              letterSpacing: '-0.25px',
              color: '#001E2E',
            }}
          >
            {heroSection.title}
          </Typography>
        </Box>
      </Box>
      <Container maxWidth="md" sx={{ marginTop: '57px', mb: 8 }}>
        {faqSections.map((section) => (
          <FaqSection
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
      </Container>
    </>
  );
};

export default MentorshipFaqsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const combinedResponse = await fetchData('mentorship-faq-page');
    const data: MentorshipPageData = combinedResponse.data;

    return {
      props: {
        data: data,
        error: null,
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching mentorship FAQ data:', error);
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};
