import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type LinkButtonProps = {
  href: string;
  reversed?: boolean;
  small?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  'data-testid'?: string;
};

export const LinkButton = ({
  href,
  reversed,
  small,
  disabled = false,
  children,
  'data-testid': dataTestId,
}: LinkButtonProps) => {
  const isExternal = href.startsWith('https');

  const buttonSx = {
    backgroundColor: reversed ? '#fff' : 'primary.main',
    color: reversed ? 'primary.main' : '#fff',
    borderRadius: '100px',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: small ? '0.8rem' : '1rem',
    padding: small ? '7px 16px' : '10px 32px',
  };

  if (disabled) {
    return (
      <Button
        component="button"
        type="button"
        disabled
        variant="contained"
        data-testid={dataTestId}
        sx={buttonSx}
      >
        {children}
      </Button>
    );
  }

  if (isExternal) {
    return (
      <Button
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        data-testid={dataTestId}
        sx={buttonSx}
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
        data-testid={dataTestId}
        sx={buttonSx}
      >
        {children}
      </Button>
    </Link>
  );
};
