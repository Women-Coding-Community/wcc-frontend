import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Typography, Link, Icon, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { GradientBorderDivider } from '@components';
import { addLineBreakAfterPeriod } from '@utils/helpers';
import { FooterResponse, Network } from '@utils/types';
import theme from 'theme';

import SlackIcon from '../../public/icons/slack-icon.svg';

const iconNetworkMapper = {
  linkedin: <LinkedInIcon fontSize="large" />,
  github: <GitHubIcon fontSize="large" />,
  instagram: <InstagramIcon fontSize="large" />,
  twitter: <TwitterIcon fontSize="large" />,
  email: <EmailIcon fontSize="large" />,
  slack: <SlackIcon width={32} height={32} fill={'FFF'} />,
};

export const Footer = ({
  title,
  subtitle,
  description,
  network,
  link,
}: FooterResponse) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const renderSocialNetworkIcon = (network: Network) => {
    return (
      <a href={network.link} key={network.type}>
        <Icon
          baseClassName="material-symbols-outlined"
          sx={{
            color: 'primary.dark',
            marginRight: '7px',
            width: '34px',
            height: '34px',
          }}
          fontSize="large"
        >
          {iconNetworkMapper[network.type as keyof typeof iconNetworkMapper]}
        </Icon>
      </a>
    );
  };

  const modifyFooterDescription: string = addLineBreakAfterPeriod(description);
  return (
    <>
      <GradientBorderDivider
        height="1rem"
        width="100%"
        gradientColors="linear-gradient(to right, #84B1D0, #FFDEA6, #FFB59D)"
      />
      <Box
        sx={{
          bgcolor: '#F4F0EF',
          py: { xs: 2, md: 5 },
          px: { xs: 2, md: 10, xl: '20%' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          pb: { xs: 5 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            mb: { xs: 2, md: 0 },
          }}
        >
          <Image
            src="/logo_white.png"
            alt="Woman Coding Community"
            width={80}
            height={80}
          />

          <p
            style={{ fontSize: isMobile ? '12px' : '14px' }}
            dangerouslySetInnerHTML={{ __html: modifyFooterDescription }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            sx={{ fontSize: '16px' }}
            color="primary.dark"
            typography={{ fontWeight: '600' }}
          >
            {title}
          </Typography>
          <Typography variant="body1" color="primary.dark">
            {subtitle}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '0.5rem',
            }}
            key="social-icons-container"
          >
            {network.map((socialMediaNetwork) =>
              renderSocialNetworkIcon(socialMediaNetwork),
            )}
          </Box>
          <Typography
            variant="body1"
            color="primary.dark"
            typography={{ fontWeight: '600' }}
            pt={2}
            sx={{ fontSize: '16px' }}
          >
            {link.title} <br />
            <Link
              href={link.uri}
              color="primary.dark"
              target="_blank"
              rel="noopener noreferrer"
              typography={{ fontWeight: '500' }}
            >
              {link.label}
            </Link>
          </Typography>
        </Box>
      </Box>
      <style>
        {`
          .slack-icon {
            color: #000;
          }
        `}
      </style>
    </>
  );
};
