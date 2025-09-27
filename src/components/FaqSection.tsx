import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from '@mui/material';
import React, { useState, SyntheticEvent } from 'react';

import theme from 'theme';

import { FaqSectionProps } from '../utils/types';

export const FaqSection: React.FC<FaqSectionProps> = ({ title, items }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (accordionId: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? accordionId : false);
    };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 3,
          fontSize: '45px',
          lineHeight: 1.156,
          color: theme.palette.text.primary,
        }}
      >
        {title}
      </Typography>
      {items.map((item, index) => {
        const accordionId = `accordion-${index}`;

        return (
          <Accordion
            key={accordionId}
            expanded={expanded === accordionId}
            onChange={handleChange(accordionId)}
            sx={{
              '&:before': {
                display: 'none',
              },
              borderBottom: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              '&:first-of-type': {
                borderTop: '1px solid',
                borderColor: 'divider',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${accordionId}-content`}
              id={`${accordionId}-header`}
              sx={{ py: 1.25 }}
            >
              <Typography>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
