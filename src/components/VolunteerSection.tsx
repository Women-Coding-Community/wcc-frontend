import { Box, Typography, Button, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useIsMobile } from '@utils/theme-utils';
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
  const isMobile = useIsMobile();

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
                <Typography variant="h4" color="text.primary">
                  {title}
                </Typography>

                <Typography variant="body1" color="primary.dark" pt={2}>
                  {description}
                </Typography>
                <Button
                  size="large"
                  sx={{
                    backgroundColor: theme.typography.button.color,
                    height: '40px',
                    borderRadius: '100px',
                    marginTop: '1.3rem',
                    '&:hover': {
                      backgroundColor: 'rgb(86, 180, 231)',
                    },
                  }}
                >
                  <Link
                    href={linkUri}
                    style={{
                      textDecoration: 'none',
                      padding: '1rem',
                      textAlign: 'left',
                      color: '#00000',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="#fff"
                      textAlign="center"
                      fontWeight={theme.typography.fontWeightBold}
                      letterSpacing="0.1px"
                    >
                      {linkTitle}
                    </Typography>
                  </Link>
                </Button>
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
