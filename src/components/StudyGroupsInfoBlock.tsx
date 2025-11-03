import { Box, Grid, Typography, Link } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import theme from '../theme';
import { ContactLink } from '../utils/types';

import { ContactBox } from './ContactBox';

interface StudyGroupInfoBlockProps {
  introText: string;
  contactLinks: ContactLink[];
}

export const StudyGroupsInfoBlock: React.FC<StudyGroupInfoBlockProps> = ({
  introText,
  contactLinks,
}) => {
  const slackLink =
    contactLinks.find((link) => link.type === 'slack')?.link || '#';

  return (
    <Grid
      container
      justifyContent="center"
      px={{ xs: '20px', md: 0 }}
      pt={{ xs: '30px', md: '16px' }}
      pb={{ xs: '30px', md: 0 }}
    >
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          mr: { md: '62px' },
          mb: { xs: '30px', md: 0 },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              mt: 2,
              fontWeight: 600,
              lineHeight: 1.22,
              fontSize: '2.25rem',
            }}
          >
            How it works
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              whiteSpace: 'pre-line',
            }}
          >
            {introText}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          pt: { xs: 0, md: '75px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' },
            width: '358px',
            pt: { xs: 0, md: '75px' },
            '& > *': {
              mx: { xs: 0 },
            },
          }}
        >
          <ContactBox title="">
            <Link
              href={slackLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '12px',
                textDecoration: 'none',
                color: theme.palette.primary.main,
                fontWeight: 500,
                fontSize: '1rem',
                lineHeight: 1.5,
              }}
            >
              <Image
                src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
                alt="Slack Icon"
                width={24}
                height={24}
              />
              <Typography variant="h5" component="span">
                Join us in our Study Group Slack Channel
              </Typography>
            </Link>
          </ContactBox>
        </Box>
      </Grid>
    </Grid>
  );
};
