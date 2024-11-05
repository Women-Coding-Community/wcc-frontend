// path: /mentorship/faqs

// import FeedbackCard from 'componets'

import { Box, Typography, Button } from '@mui/material';
import React from 'react';

// import QuoteIcon from '../../../public/logo_white.png';

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

interface FeedbackSectionProps {
  title: string;
  feedbacks: FeedbackCardProps[];
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  title,
  feedbacks,
}) => {
  return (
    <>
      <div>
        <Typography variant="h3">{title}</Typography>
        <div>
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <FeedbackCard
                key={index}
                name={feedback.name}
                feedback={feedback.feedback}
                mentee={feedback.mentee}
                year={feedback.year}
              />
            ))
          ) : (
            <p></p>
          )}
        </div>
        <Button>+ Show more</Button>
      </div>
    </>
  );
};
