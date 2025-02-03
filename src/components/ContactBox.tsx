import { Box, Typography } from '@mui/material';
import React from 'react';

interface ContactBoxProps {
  title: string;
  children?: React.ReactNode;
}

export const ContactBox: React.FC<ContactBoxProps> = ({ title, children }) => {
  return (
    <Box>
      <Typography>{title}</Typography>
      {children}
    </Box>
  );
};
