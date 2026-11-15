import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react';

import { LinkButton } from '@components';
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

  const desktopImage = images?.[0];
  const mobileImage = images?.[1] ?? desktopImage;
  const alt = (isMobile ? mobileImage : desktopImage)?.alt ?? '';
  const path = (isMobile ? mobileImage : desktopImage)?.path ?? '';

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
        backgroundImage: `linear-gradient(rgba(0, 52, 76, 0.7), rgba(0, 52, 76, 0.7)), url("${path}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography
        variant="h3"
        color={theme.palette.common.white}
        align="center"
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          maxWidth: {
            xs: '339px',
            sm: '737.03px',
          },
        }}
        color={theme.palette.common.white}
        align="center"
      >
        {description}
      </Typography>

      <LinkButton href={link.uri} aria-label={link.label} reversed>
        {link.label}
      </LinkButton>
    </Box>
  );
};