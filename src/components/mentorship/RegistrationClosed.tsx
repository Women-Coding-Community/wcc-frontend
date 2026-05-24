import { Box, Button, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';

/**
 * Displayed when the mentee registration window is closed.
 */
const RegistrationClosed = () => (
  <Box sx={{ textAlign: 'center', py: 4 }}>
    <Typography variant="h5" gutterBottom fontWeight={600}>
      Application is now closed
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
      Applications for the Long-Term Mentorship programme are currently closed.
    </Typography>
    <Button variant="contained" component={NextLink} href="/mentorship">
      Back to Mentorship
    </Button>
  </Box>
);

export default RegistrationClosed;
