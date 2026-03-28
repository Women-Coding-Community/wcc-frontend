import { Box, Typography, Button } from '@mui/material';
import React, { useState } from 'react';

import { FeedbackItem } from '@utils/types';

import { ColoredBox } from './ColoredBox';
import { FeedbackCard } from './FeedbackCard';

interface FeedbackSectionProps {
  title: string;
  feedbacks: FeedbackItem[];
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
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
