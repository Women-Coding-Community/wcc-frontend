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
  const desktopImage = images.find((image) => image.type === 'desktop');
  const mobileImage = images.find((image) => image.type === 'mobile');

  const image = isMobile ? (mobileImage?.path || desktopImage?.path) : (desktopImage?.path);
  const alt = isMobile ? (mobileImage?.alt || desktopImage?.alt) : (desktopImage?.alt);


  return (
    <>
      <Grid
        container
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
        <Grid item xs={12} sm={5} style={{ padding: 0, margin: 0, }}>
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
        <Grid item xs={12} sm={7} style={{ padding: 0, margin: 0, background: 'yellow', boxSizing: 'border-box' }}>
          <Box
            sx={{
              position: 'relative',             
              overflow: 'visible',
              width: '100%',
              maxWidth: '647px',     
              borderRadius: '4px',
              height: 'auto',              
            }}
          >    
          <Image
            src={image || ''}
            alt={alt || ''}
            objectFit="cover"
            objectPosition="center 25%"
            style={{ 
              borderRadius: '4px', 
              display: 'block',
              filter: isMobile ? 'drop-shadow(10px 10px 0px rgba(255, 181, 157, 0.8))' : 'drop-shadow(20px 20px 0px rgba(255, 181, 157, 0.8))',
            }}
            quality={100}
            priority
            layout="responsive"
            width={343}
            height={195}
            sizes="(max-width: 750px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />   
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to right, #507C99, #FFB59D)',
              opacity: 0.8,
              pointerEvents: 'none',
              borderRadius: '4px',
            }}
          />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
