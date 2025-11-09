import { Box, Typography } from '@mui/material';
import React from 'react';

interface HeroSectionProps {
  title: string;
  text: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, text }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#E8F4FD',
        textAlign: 'center',
        py: { xs: 6, md: 12 },
        px: { xs: 3, md: 8 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '28px', md: '48px' },
          fontWeight: 700,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '16px', md: '20px' },
          color: '#555',
          maxWidth: '700px',
          mx: 'auto',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default HeroSection;
