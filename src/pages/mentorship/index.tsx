import { Typography, Button, Box, Grid, useMediaQuery } from '@mui/material';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';

import {
  BreadCrumbsDynamic,
  Footer,
  ColoredBox,
  FeedbackCard,
  MentorBecomeCard,
  Title,
} from '@components';
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
  return (
    <>
      <BreadCrumbsDynamic />
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

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  title,
  feedbacks,
}) => {
  const initialDisplay = 3;
  const [feedbacksDisplayed, setFeedbacksDisplayed] =
    useState<number>(initialDisplay);
  const showMoreFeedbacks = () => {
    setFeedbacksDisplayed((prevCount) =>
      Math.min(prevCount + 3, feedbacks.length),
    );
  };
  const showLessFeedbacks = () => {
    setFeedbacksDisplayed(3);
  };

  return (
    <ColoredBox color={'#FFDEA6'}>
      <Box
        data-testid="feedback-area"
        sx={{ display: 'grid', justifyItems: 'center', gap: '3rem' }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '24px', sm: '24px', md: '45px' },
            maxWidth: { xs: '361px', sm: '361px', md: '742px' },
            lineHeight: { xs: '32px', sm: '32px', md: '52px' },
            fontWeight: 600,
            paddingTop: '2rem',
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: 'repeat(3, 1fr)', md: '' },
            gap: 2,
            gridTemplateRows: {
              sm: feedbacksDisplayed > initialDisplay ? '1fr 1fr' : '',
              md: '',
            },
          }}
        >
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks
              .slice(0, feedbacksDisplayed)
              .map((feedback: FeedbackItem) => (
                <FeedbackCard
                  key={feedback.name}
                  name={feedback.name}
                  feedback={feedback.feedback}
                  mentee={feedback.memberType === 'Mentee'}
                  year={
                    typeof feedback.year === 'string'
                      ? parseInt(feedback.year, 10)
                      : feedback.year
                  }
                />
              ))
          ) : (
            <p>There‵s no feedback yet!</p>
          )}
        </Box>

        {feedbacks.length > initialDisplay && (
          <Button
            onClick={
              feedbacksDisplayed >= feedbacks.length
                ? showLessFeedbacks
                : showMoreFeedbacks
            }
            variant="outlined"
            data-testid="feedback-show-more"
            sx={{
              borderRadius: '20px',
              border: '1px solid #71787E',
              color: '#1A4B66',
            }}
          >
            {feedbacksDisplayed >= feedbacks.length
              ? '- Show less'
              : '+ Show more'}
          </Button>
        )}
      </Box>
    </ColoredBox>
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
