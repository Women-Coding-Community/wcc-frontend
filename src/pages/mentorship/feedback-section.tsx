// path: /mentorship/faqs

import { Typography, Button, Box } from '@mui/material';
import React from 'react';

import { ColoredBox, FeedbackCard } from '@components';
import { FeedbackCardProps } from 'components/FeedbackCard';

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
      <ColoredBox color={'#FFDEA6'}>
        <Box sx={{ display: 'grid', justifyItems: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '24px', sm: '24px', md: '45px' },
              maxWidth: { xs: '361px', sm: '361px', md: '742px' },
              lineHeight: { xs: '32px', sm: '32px', md: '52px' },
              fontWeight: 600,
              padding: '3rem 0',
            }}
          >
            {title}
          </Typography>
          <div style={{}}>
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
        </Box>
      </ColoredBox>
    </>
  );
};
