import { Typography, Box, Grid, useMediaQuery } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

import {
  BreadCrumbsDynamic,
  Footer,
  FeedbackSection,
  MentorBecomeCard,
  Title,
} from '@components';
import { useIsMobile } from '@utils/theme-utils';
import { MentorshipProgrammeData } from '@utils/types';
import { fetchData } from 'lib/api';
import footerData from 'lib/responses/footer.json';
import pageData from 'lib/responses/mentorship.json';
import theme from 'theme';

interface MentorshipPageProps {
  mentorship: MentorshipProgrammeData;
  error: string | null;
}

const MentorshipPage = ({ mentorship }: MentorshipPageProps) => {
  const heroTitle = pageData.heroSection.title;
  const heroDescription = pageData.section.description;
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? null : <BreadCrumbsDynamic />}
      <Title title={heroTitle} />

      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 0 },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '16px', sm: '18px', md: '20px' },
            lineHeight: 1.8,
            maxWidth: '750px',
            margin: '0 auto',
            color: theme.palette.common.black,
          }}
        >
          {heroDescription}
        </Typography>
      </Box>

      <Grid
        container
        style={{
          background: '#F6FAFE',
          padding: useMediaQuery(theme.breakpoints.down(544))
            ? '35px 15px'
            : '160px 80px',
        }}
      >
        <MentorBecomeCard
          mentorOrMentee="mentor"
          topics={[
            'Want to extend your professional network',
            'Want to contribute to the community',
            'You are ready to share expertise',
            'You want to get a new perspective and learn from your mentees',
          ]}
          buttonUrl="https://docs.google.com/forms/d/e/1FAIpQLSdtf7-upMp1m5kJ4MSpexS-UwGJHhACEW-yPoEQoROHi4kVcg/viewform"
          buttonText={'Join as a mentor'}
        ></MentorBecomeCard>
        <MentorBecomeCard
          mentorOrMentee="mentee"
          topics={[
            'Want to start a career in software engineering',
            'Want to find a better job',
            'Want to be promoted at work',
            'Want to apply for a leadership position',
            'Need support in advancing your career',
          ]}
          buttonUrl="/mentorship/mentors"
          buttonText={'Find a mentor'}
        ></MentorBecomeCard>
      </Grid>
      <FeedbackSection
        title={mentorship.feedbackSection.title}
        feedbacks={mentorship.feedbackSection.feedbacks}
      />
      <Footer {...footerData} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('mentorship/overview');

    return {
      props: {
        mentorship: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    };
  }
};

export default MentorshipPage;
