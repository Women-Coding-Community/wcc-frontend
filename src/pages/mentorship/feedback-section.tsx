// path: /mentorship/faqs

import { Typography, Button, Box, Grid } from '@mui/material';
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
        <Box sx={{ display: 'grid', justifyItems: 'center', gap: '3rem' }}>
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
          <Grid
            container
            spacing={{ xs: 3, sm: 3, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ justifyContent: 'center', maxWidth: '70rem' }}
          >
            {feedbacks && feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <Grid item xs={12} sm={6} md={4} key={feedback.name}>
                  <FeedbackCard
                    key={index}
                    name={feedback.name}
                    feedback={feedback.feedback}
                    mentee={feedback.mentee}
                    year={feedback.year}
                  />
                </Grid>
              ))
            ) : (
              <p>There‵s no feedback yet!</p>
            )}
          </Grid>

          <Button
            variant="outlined"
            sx={{
              borderRadius: '20px',
              border: '1px solid #71787E',
              color: '#1A4B66',
            }}
          >
            + Show more
          </Button>
        </Box>
      </ColoredBox>
    </>
  );
};
