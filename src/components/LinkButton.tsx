import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type LinkButtonProps = {
  href: string;
  reversed?: boolean;
  small?: boolean;
  children: React.ReactNode;
};

export const LinkButton = ({
  href,
  reversed,
  small,
  children,
}: LinkButtonProps) => {
  const isExternal = href.startsWith('https');

  if (isExternal) {
    return (
      <Button
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        sx={{
          backgroundColor: reversed ? '#fff' : 'primary.main',
          color: reversed ? 'primary.main' : '#fff',
          borderRadius: '100px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '10px 32px',
        }}
      >
        {children}
      </Button>
    );
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <Button
        component="a"
        variant="contained"
        sx={{
          backgroundColor: reversed ? '#fff' : 'primary.main',
          color: reversed ? 'primary.main' : '#fff',
          borderRadius: '100px',
          textTransform: 'none',
          fontWeight: 600,
          // width: small ? 'fit-content' : '100%',
          fontSize: small ? '0.8rem' : '1rem',
          padding: small ? '7px 16px' : '10px 32px',
        }}
      >
        {children}
      </Button>
    </Link>
  );
};
