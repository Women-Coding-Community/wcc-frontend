import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from '@mui/material';
import React from 'react';

import { FaqSectionProps } from '../utils/types';

export const FaqSection: React.FC<FaqSectionProps> = ({ title, items }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5">{title}</Typography>
      {items.map((item) => (
        <Accordion key={item.question}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
