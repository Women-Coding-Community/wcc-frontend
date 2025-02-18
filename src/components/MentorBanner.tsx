import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { LandingPageResponse } from '@utils/types';

import theme from '../theme';

interface BannerProps {
  title: string;
  description: string;
  images: LandingPageResponse['fullBannerSection']['images'];
  link: LandingPageResponse['fullBannerSection']['link'];
}

export const MentorBanner: React.FC<BannerProps> = ({
  title,
  description,
  images,
  link,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { alt: desktopAlt, path: desktopPath } = images[0];
  const { alt: mobileAlt, path: mobilePath } = images[1] || images[0];

  const { uri: linkUri, label: linkLabel } = link;

  const image = isMobile ? `${mobilePath}` : `${desktopPath}`;
  const alt = isMobile ? mobileAlt : desktopAlt;

  return (
    <Box
      aria-label={alt}
      data-testid="mentor-banner"
      sx={{
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'space-evenly',
        padding: '8%',
        height: {
          xs: theme.customBannerHeights.mobile,
          sm: theme.customBannerHeights.tablet,
          md: theme.customBannerHeights.tablet,
          lg: theme.customBannerHeights.desktop,
        },

        width: '100%',
        background: `linear-gradient(rgba(26, 75, 102, 1),rgba(0, 52, 76, 0.7)), url(${image}) no-repeat`,
        backgroundSize: 'cover',
        opacity: '0.8px',
        backgroundPosition: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: '24px',
            sm: '45px',
          },
          color: theme.palette.common.white,
          align: 'center',
          height: { xs: '35px', sm: '52px' },
          paddingTop: {
            xs: '3em',
            sm: '1em',
          },
          paddingBottom: { xs: '1.2em', sm: '0.7em' },
          fontWeight: theme.typography.fontWeightBold,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xs: '16px',
            sm: '24px',
          },
          maxWidth: {
            xs: '339px',
            sm: '737.03px',
          },
          height: {
            xs: '67px',
            sm: '96px',
          },
          lineHeight: {
            xs: '24px',
            sm: '32px',
          },
          paddingTop: { xs: '0', sm: '0.5em' },
          paddingBottom: { xs: '6em', sm: '0' },
        }}
        color={theme.palette.common.white}
        align="center"
        fontWeight={theme.typography.fontWeightMedium}
      >
        {description}
      </Typography>

      <Button
        style={{
          backgroundColor: theme.palette.common.white,
          height: '48px',
          width: '163.92px',
          gap: '8px',
          borderRadius: '100px',
        }}
      >
        <Link
          href={linkUri}
          aria-label={linkLabel}
          style={{
            textDecoration: 'none',
            padding: '1rem',
            textAlign: 'center',
            width: '140 px',
            height: '40 px',
          }}
        >
          <Typography
            variant="h6"
            width={'107 px'}
            height={'20 px'}
            color={theme.typography.button.color}
            fontSize="14px"
            textAlign="center"
            fontWeight={theme.typography.fontWeightBold}
            lineHeight="20px"
            letterSpacing="0.1px"
          >
            {linkLabel}
          </Typography>
        </Link>
      </Button>
    </Box>
  );
};
