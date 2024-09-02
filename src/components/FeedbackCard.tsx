import { Box, Typography } from '@mui/material';
import React from 'react';

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
        weight: '360px',
      }}
    >
      <span style={{ fontSize: '4rem' }}>“</span>
      <Typography variant="body2">{feedback}</Typography>
      <Typography variant="subtitle2">{boldText}</Typography>
    </Box>
  );
};
