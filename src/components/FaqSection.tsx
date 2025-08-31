import { Box, Typography } from '@mui/material';
import React from 'react';

import { FaqSectionProps } from '../utils/types';

export const FaqSection: React.FC<FaqSectionProps> = ({ title, items }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5">{title}</Typography>
      {items.map((item) => (
        <>
          <p>{item.question}</p>
          <p>{item.answer}</p>
        </>
      ))}
    </Box>
  );
};
