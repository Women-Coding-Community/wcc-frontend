import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';

const TimelineCard = ({
  type,
  duration,
  registration,
}: {
  type: string;
  duration: string;
  registration: string;
}) => (
  <Box
    sx={{
      flex: 1,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      p: 2.5,
      textAlign: 'left',
    }}
  >
    <Chip label={type} size="small" color="primary" sx={{ mb: 2 }} />
    <Stack spacing={1.5}>
      <Box>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          DURATION
        </Typography>
        <Typography variant="body2">{duration}</Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          REGISTRATION OPENS
        </Typography>
        <Typography variant="body2">{registration}</Typography>
      </Box>
    </Stack>
  </Box>
);

const RegistrationClosed = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 4, maxWidth: 560, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Mentorship Applications are currently closed
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Here&apos;s when you can apply:
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <TimelineCard
          type="Long Term"
          duration={`May - October`}
          registration="May"
        />
        <TimelineCard
          type="Adhoc"
          duration="Every month, June - November"
          registration="First 10 days of each month"
        />
      </Stack>
      <Button variant="contained" component={NextLink} href="/mentorship">
        Back to Mentorship
      </Button>
    </Box>
  );
};

export default RegistrationClosed;
