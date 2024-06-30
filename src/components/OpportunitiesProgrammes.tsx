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
      <Box sx={{ display: 'grid', gap: '1rem', justifyItems: 'center' }}>
        <Typography
          variant="h3"
          color="text.primary"
          align="center"
          sx={{
            fontWeight: 'bold',
          }}
        >
          {content.title}
        </Typography>
        <Typography
          variant="h5"
          color="text.primary"
          align="center"
          sx={{ maxWidth: '600px' }}
        >
          {content.description}
        </Typography>
        <Grid
          style={{
            justifyContent: 'center',
          }}
          container
          spacing={{ xs: 2, sm: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
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
