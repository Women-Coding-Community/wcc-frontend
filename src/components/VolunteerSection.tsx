import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { LinkButton } from '@components';
import { LandingPageResponse } from '@utils/types';

import theme from '../theme';

interface VolunteerProps {
  title: string;
  description: string;
  link: LandingPageResponse['volunteerSection']['link'];
  images: LandingPageResponse['volunteerSection']['images'];
}

export const VolunteerSection: React.FC<VolunteerProps> = ({
  title,
  description,
  images,
  link,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { alt: imageAlt, path: imagePath } = images[0];
  const { title: linkTitle, uri: linkUri } = link;

  const image = `${imagePath}`;
  const alt = imageAlt;

  return (
    <>
      <Box bgcolor="#FFDBD0" aria-label={alt}>
        <Box
          sx={{
            padding: '21px 16px 48px 16px',
            '@media (min-width: 600px)': { padding: '75px 16px' },
          }}
        >
          <Grid
            container
            spacing={0}
            borderRadius={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              maxWidth: isMobile ? '100%' : '1100px',
              gap: isMobile ? 1 : 0,
              margin: '0 auto',
            }}
            direction={isMobile ? 'column' : 'row'}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                justifyItems: 'center',
                alignItems: 'center',
                padding: isMobile ? '75px 52px' : '94.2px 52px',
                bgcolor: '#ffff',
              }}
            >
              <Box textAlign={isMobile ? 'center' : 'left'}>
                <Typography variant="h4">{title}</Typography>

                <Typography color="primary.dark" pt={2} pb={3}>
                  {description}
                </Typography>
                <LinkButton href={linkUri}> {linkTitle}</LinkButton>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'grid',
                justifyItems: 'center',
              }}
            >
              <Image
                src={image}
                data-testid="vol"
                alt={alt}
                width={634}
                height={493}
                style={{
                  maxWidth: '100%',
                }}
                priority={true}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
