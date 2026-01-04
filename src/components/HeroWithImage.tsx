import { Box, Typography, Grid } from '@mui/material';
import React from 'react';

interface HeroWithImageProps {
  title: string;
  imageSrc: string;
}

export const HeroWithImage: React.FC<HeroWithImageProps> = ({
  title,
  imageSrc,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#D9EBFF',
        paddingY: '60px',
        paddingX: { xs: 0, md: '60px' },
        margin: 0,
        width: '100%',
        mx: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <Grid
        container
        spacing={{ xs: 0, md: 0 }}
        alignItems="center"
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{ maxWidth: '1128px', mx: 'auto' }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              backgroundColor: { xs: '#0D1F2D', md: 'transparent' },
              padding: { xs: '30px 100px', md: '0 50px 0 0' },
              width: '100%',
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  backgroundColor: '#0D1F2D',
                  color: 'white',
                  display: 'inline-block',
                  padding: '16px 24px',
                  mb: 2,
                  fontSize: '2rem',
                }}
              >
                {title.split(' ')[0]}
              </Typography>
              <br />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  backgroundColor: '#0D1F2D',
                  color: 'white',
                  display: 'inline-block',
                  padding: '16px 24px',
                  fontSize: '2rem',
                }}
              >
                {title.split(' ').slice(1).join(' ')}
              </Typography>
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '2rem',
                  mb: 0.5,
                  lineHeight: 1.2,
                }}
              >
                {title.split(' ').slice(0, 2).join(' ')}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '2rem',
                  lineHeight: 1.2,
                }}
              >
                {title.split(' ')[2]}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={imageSrc}
            alt={title}
            sx={{
              width: '100%',
              height: { xs: 350, md: 'auto' },
              objectFit: 'cover',
              borderRadius: 0,
              boxShadow: { xs: 0, md: 3 },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
