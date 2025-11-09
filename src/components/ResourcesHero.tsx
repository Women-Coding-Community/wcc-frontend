import { Typography, Box, Paper } from '@mui/material';
import React from 'react';

interface ResourcesHeroProps {
  title: string;
  description: string;
}

const ResourcesHero: React.FC<ResourcesHeroProps> = ({ title, description }) => {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'lightblue',
          paddingY: 6,
          textAlign: 'center',
          width: '100%',
          marginTop: 0,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: 'black',
            fontWeight: 'bold',
            marginBottom: 0,
            fontSize: {
              xs: '2rem',
              md: '3rem',
            },
          }}
        >
          {title}
        </Typography>
      </Paper>

      <Box
        sx={{
          maxWidth: 800,
          margin: '40px auto',
          paddingX: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1.2rem', md: '1.4rem' },
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
      </Box>
    </>
  );
};

export default ResourcesHero;
