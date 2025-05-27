import { Box, Typography, Grid, useMediaQuery, Link } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { GradientBorderDivider } from '@components';

import theme from '../theme';
import { LandingPageResponse } from '../utils/types';

interface HeroProps {
  title: string;
  description: string;
  images: LandingPageResponse['heroSection']['images'];
}

export const Hero: React.FC<HeroProps> = ({ title, description, images }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down(750));

  const image = images.find(
    (img) =>
      (isMobile && img.type === 'mobile') ||
      (!isMobile && img.type === 'desktop'),
  );

  return (
    <>
      <Grid
        container
        data-testid="hero-container"
        spacing={0}
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: '21px 16px 48px 16px',
          maxWidth: isMobile ? '100%' : '1128px',
          margin: '0 auto',
        }}
        direction={isMobile ? 'column' : 'row'}
      >
        <Grid item xs={12} sm={5} style={{ padding: 0, margin: 0 }}>
          <Box
            textAlign={isMobile ? 'center' : 'left'}
            marginRight={isMobile ? '' : '52px'}
          >
            <Typography
              variant="h2"
              color={theme.palette.primary.main}
              sx={{ fontSize: '2.25rem', fontWeight: '600', lineHeight: '1.2' }}
            >
              {title}
            </Typography>
            <GradientBorderDivider
              height="0.5rem"
              width="100px"
              margin={isMobile ? '12px auto 16px' : '29px 23px auto 0'}
              gradientColors="linear-gradient(to right, #84B1D0, #FFDEA6, #FFB59D)"
            />
            <Typography
              variant="h4"
              color={theme.palette.primary.dark}
              sx={{
                marginY: 2,
                fontSize: '1.5rem',
                fontWeight: '500',
                lineHeight: '1.2',
              }}
            >
              {description}
            </Typography>
            <Link
              href="https://join.slack.com/t/womencodingcommunity/shared_invite/zt-2hpjwpx7l-rgceYBIWp6pCiwc0hVsX8A"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '1.25rem',
                textDecoration: 'underline',
                color: 'theme.palette.primary.main',
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              Join our Slack
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} style={{ padding: 0, margin: 0 }}>
          <Box>
            {image ? (
              <Image
                src={image.path}
                alt={image.alt}
                width={647}
                height={374}
                style={{ maxWidth: '100%', height: '100%' }}
                priority
              />
            ) : (
              <Image
                src={images[0].path}
                alt={images[0].alt}
                width={647}
                height={374}
                style={{ maxWidth: '100%', height: '100%' }}
                priority
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
