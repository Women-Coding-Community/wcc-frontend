import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

interface StudyGroupInfoBlockProps {
  introText: string;
}

export const StudyGroupsInfoBlock: React.FC<StudyGroupInfoBlockProps> = ({
  introText,
}) => {
  return (
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} md={8} sx={{ mr: { xs: 0, md: '124px' } }}>
        <Box>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              mt: 2,
              fontWeight: 600,
              lineHeight: 1.22,
              fontSize: '2.25rem',
            }}
          >
            How it works
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              whiteSpace: 'pre-line',
              marginBottom: '80px',
              fontWeight: 400,
              fontSize: '1.5rem',
              lineHeight: 1.5,
            }}
          >
            {introText}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        {/* ... (ContactBox) ... */}
      </Grid>
    </Grid>
  );
};
