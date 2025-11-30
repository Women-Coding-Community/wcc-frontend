import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Error = ({ title }) => {
  return (
    <Box
      sx={{
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <main>
        <Typography variant="h3" color="#001E2E" sx={{ marginBottom: '20px' }}>
          {title}
        </Typography>

        <img src="/icons/error-illustration.png" alt="Error Robot" />
        <p>Something went wrong on our end. Please try again later.</p>
        <Link href="/">
          <Button
            component="a"
            variant="contained"
            color="primary"
            sx={{ borderRadius: '100px' }}
          >
            Back to home
          </Button>
        </Link>
      </main>
    </Box>
  );
};

export default Error;
