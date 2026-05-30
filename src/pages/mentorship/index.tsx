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
import {
  FooterResponse,
  MentorshipProgrammeData,
  FeedbackItem,
} from '@utils/types';
import { fetchData } from 'lib/api';
import theme from 'theme';

interface MentorshipPageProps {
  mentorship: MentorshipProgrammeData;
  footer: FooterResponse;
  error: string | null;
}

interface FeedbackSectionProps {
  title: string;
  feedbacks: FeedbackItem[];
}

const MentorshipPage = ({ mentorship, footer }: MentorshipPageProps) => {
  const heroTitle = pageData.heroSection.title;
  const heroDescription = pageData.section.description;
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? null : <BreadCrumbsDynamic />}
      <Title title={mentorship.heroSection.title} />

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
          {mentorship.section.description}
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
          topics={mentorship.mentorSection.items}
          buttonUrl={mentorship.mentorSection.link.uri}
          buttonText={mentorship.mentorSection.link.label}
        ></MentorBecomeCard>
        <MentorBecomeCard
          mentorOrMentee="mentee"
          topics={mentorship.menteeSection.items}
          buttonUrl={mentorship.menteeSection.link.uri}
          buttonText={mentorship.menteeSection.link.label}
        ></MentorBecomeCard>
      </Grid>
      <FeedbackSection
        title={mentorship.feedbackSection.title}
        feedbacks={mentorship.feedbackSection.feedbacks}
      />
      <Footer {...footer} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('mentorship/overview');

    return {
      props: {
        mentorship: response.data,
        footer: response.footer,
        error: null,
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
