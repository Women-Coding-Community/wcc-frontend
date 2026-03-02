import React from 'react';
import { Box, Typography } from '@mui/material';

interface StepSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const StepSection = ({ title, description, children }: StepSectionProps) => (
  <Box>
    <Typography
      variant="h5"
      sx={{
        fontFamily: 'Domine, serif',
        fontWeight: 700,
        mb: 2,
        color: 'text.primary'
      }}
    >
      {title}
    </Typography>

    {description && (
      <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.5, color: 'text.primary' }}>
        {description}
      </Typography>
    )}

    {children}
  </Box>
);

export default StepSection;
