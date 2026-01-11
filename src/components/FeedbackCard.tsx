import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

import QuoteIcon from '@public/icons/quote-icon-custom_orange.svg';

export interface FeedbackCardProps {
  name: string;
  feedback: string;
  mentee: boolean;
  year: number;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  name,
  feedback,
  mentee,
  year,
}) => {
  const [showMore, setShowMore] = useState(false);
  const isLong = feedback.length > 300;
  const displayedFeedback =
    isLong && !showMore ? feedback.slice(0, 300) + '...' : feedback;
  const boldText = `${name}, ${mentee ? 'Mentee' : 'Mentor'} ${year}`;

  return (
    <Box
      data-testid="feedback-card"
      sx={{
        display: 'grid',
        gap: '1rem',
        borderRadius: '12px',
        backgroundColor: 'white',
        padding: '2rem',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <QuoteIcon />

      <Typography data-testid="feedback-card-text" variant="body2">
        {displayedFeedback}{' '}
        {isLong && (
          <Button
            size="small"
            data-testid="feedback-card-show-more-less"
            onClick={() => setShowMore((prev) => !prev)}
            sx={{
              justifySelf: 'end',
              textTransform: 'none',
              padding: 0,
              minWidth: 0,
            }}
          >
            {showMore ? 'Show less' : 'Show more'}
          </Button>
        )}
      </Typography>

      <Typography
        variant="subtitle2"
        data-testid="feedback-card-author"
        sx={{ fontWeight: '500', lineHeight: '20px', letterSpacing: '0.1px' }}
      >
        {boldText}
      </Typography>
    </Box>
  );
};
