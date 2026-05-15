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
        <Typography variant="h3" color="#001E2E" sx={{ marginBottom: "20px" }}>
          {title}
        </Typography>

        <Image
          src="/icons/error-illustration.png"
          alt="Error Robot"
          width={743}
          height={418}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        <Typography variant="body1" sx={{ marginTop: "30px", marginBottom: "20px" }}>
          Something went wrong on our end. Please try again later.
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          color="primary"
          sx={{ borderRadius: "100px", marginBottom:"20px" }}
        >
          Back to home
        </Button>
      </main>
    </Box>
  );
};
