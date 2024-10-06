import { Box, Typography } from '@mui/material';
import React from 'react';

import QuoteIcon from '../../public/icons/quote-icon-custom_orange.svg';

interface FeedbackCardProps {
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
  const boldText = `${name}, ${mentee ? 'Mentee' : 'Mentor'} ${year}`;

  return (
    <Box
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

      <Typography variant="body2">{feedback}</Typography>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: '500', lineHeight: '20px', letterSpacing: '0.1px' }}
      >
        {boldText}
      </Typography>
    </Box>
  );
};
