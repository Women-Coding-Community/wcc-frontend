import { Box, Grid, Typography, Link } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import theme from '../theme';
import { ContactLink } from '../utils/types';

import { ContactBox } from './ContactBox';

interface InfoWithContactProps {
  introText: string;
  contactLinks: ContactLink[];
  title?: string;
  calltoAction?: string;
}

export const InfoWithContact: React.FC<InfoWithContactProps> = ({
  introText,
  contactLinks,
  title = 'How it works',
  calltoAction = 'Join us in our Study Group Slack Channel',
}) => {
  const slackLink =
    contactLinks.find((link) => link.type === 'slack')?.link || '#';

  return (
    <Grid
      container
      alignItems="flex-start"
      columnSpacing={{ xs: 0, md: 15.5 }}
      sx={{ px: { xs: 2, md: 0 }, pt: { xs: 4, md: 6 } }}
    >
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          mb: { xs: '31px', md: 0 },
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
            {title}
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
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-end' },
          alignItems: 'flex-start',
          pt: { xs: 2, md: '62px' },
        }}
      >
        <Box sx={{ maxWidth: '358px' }}>
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
                {calltoAction}
              </Typography>
            </Link>
          </ContactBox>
        </Box>
      </Grid>
    </Grid>
  );
};
