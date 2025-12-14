import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import { Tile, GradientBox } from '@components';
import { LandingPageResponse, Programme } from '@utils/types';
import theme from 'theme';

export const OpportunitiesProgrammes: React.FC<
  LandingPageResponse['programmes']
> = ({ title, description, items }) => {
  return (
    <GradientBox colors={['#FFB59D', '#FFDEA6']}>
      <Box sx={theme.custom.innerBox}>
        <Typography variant="h3" align="center" sx={{ marginBottom: 4 }}>
          {title}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          sx={{ margin: '0 auto', marginBottom: 4, maxWidth: '800px' }}
        >
          {description}
        </Typography>
        <Grid
          container
          spacing={{ xs: 3, sm: 3, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            justifyContent: 'center',
          }}
        >
          {items.map((programme: Programme, id: number) => (
            <Grid item xs={12} sm={6} md={4} key={`${programme.name}-${id}`}>
              <Tile
                name={programme.name}
                link={programme.link.uri}
                icon={programme.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </GradientBox>
  );
};
