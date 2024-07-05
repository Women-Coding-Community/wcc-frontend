import { Box, Grid, Typography } from '@mui/material';

import { LandingPageResponse } from '@utils/types';
import { Tile } from 'components/Tile';

import { GradientBox } from './GradientBox';

export const OpportunitiesProgrammes = ({
  content,
}: {
  content: LandingPageResponse['programmesSection'];
}) => {
  return (
    <GradientBox colors={['#FFB59D', '#FFDEA6']}>
      <Box
        sx={{
          display: 'grid',
          gap: '24px',
          justifyItems: 'center',
          padding: { md: '0 80px' },
        }}
      >
        <Typography
          variant="h3"
          color="text.primary"
          align="center"
          sx={{
            fontWeight: { xs: 500, md: 'bold' },
            fontSize: { xs: '28px', sm: '28px' },
          }}
        >
          {content.title}
        </Typography>
        <Typography
          variant="h5"
          color="text.primary"
          align="center"
          sx={{
            fontSize: { xs: '16px', sm: '16px', md: '24px' },
            maxWidth: { xs: '361px', sm: '361px', md: '742px' },
          }}
        >
          {content.description}
        </Typography>
        <Grid
          container
          spacing={{ xs: 3, sm: 3, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            justifyContent: 'center',
          }}
        >
          {content.programmes.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.name}>
              <Tile name={p.name} link={p.link} icon={p.icon} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </GradientBox>
  );
};
