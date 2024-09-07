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
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Typography
        sx={{
          fontSize: '96px',
          fontWeight: '400',
          color: 'secondary60',
          fontFamily: 'RocknRoll One',
          lineHeight: '24px',
          letterSpacing: '0.5px',
        }}
      >
        “
      </Typography>
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
