import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ErrorProps = {
  title?: string;
};

export const ErrorPageComponent: React.FC<ErrorProps> = ({ title }) => {
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

        <Image
          src="/icons/error-illustration.png"
          alt="Error Robot"
          width="100"
          height="100"
        />
        <Typography variant="body1">
          Something went wrong on our end. Please try again later.
        </Typography>
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
