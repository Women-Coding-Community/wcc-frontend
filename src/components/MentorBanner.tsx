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

  const { alt: desktopAlt, path: desktopPath } = images[0];
  const { alt: mobileAlt, path: mobilePath } = images[1] || images[0];
  const { uri: linkUri, label: linkLabel } = link;

  const alt = isMobile ? mobileAlt : desktopAlt;
  const path = isMobile ? mobilePath : desktopPath;

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
        background: `linear-gradient(rgba(26, 75, 102, 1),rgba(0, 52, 76, 0.7)), url(${path}) no-repeat`,
        backgroundSize: 'cover',
        opacity: '0.8px',
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

      <LinkButton href={linkUri} aria-label={linkLabel} reversed>
        {linkLabel}
      </LinkButton>
    </Box>
  );
};
