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
              borderTop: '1px solid',
              borderColor: '#92908F',
              '&:before': {
                display: 'none',
              },
              boxShadow: 'none',
              '&:first-of-type': {
                borderTop: '1px solid',
                borderColor: 'divider',
              },
              '&.Mui-expanded': {
                margin: '0',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${accordionId}-content`}
              id={`${accordionId}-header`}
              sx={{
                padding: 0,
                backgroundColor: theme.palette.custom.softGray,
                '&.Mui-expanded': {
                  '& .MuiAccordionSummary-content': {
                    marginTop: 0,
                    marginBottom: 0,
                  },
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  margin: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingRight: theme.spacing(2),
                },
              }}
            >
              <Typography
                sx={{
                  py: 1,
                  px: 2,
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: 1.5,
                  letterSpacing: '0.5px',
                  color: theme.palette.text.primary,
                }}
              >
                {item.question}
              </Typography>
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
