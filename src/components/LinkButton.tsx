import { Button, type SxProps, type Theme } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type LinkButtonProps = {
  href: string;
  reversed?: boolean;
  outlined?: boolean;
  small?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  'data-testid'?: string;
};

const pillRadius = '100px';

export const LinkButton = ({
  href,
  reversed,
  outlined,
  small,
  disabled = false,
  children,
  'data-testid': dataTestId,
}: LinkButtonProps) => {
  const isExternal = href.startsWith('https');
  const padding = small ? '7px 16px' : '10px 32px';
  const outlinedPadding = small ? '7px 16px' : '10px 24px';

  const containedSx: SxProps<Theme> = (theme) => ({
    ...(small
      ? theme.typography.linkButtonContainedSmall
      : theme.typography.linkButtonContained),
    backgroundColor: reversed ? '#fff' : 'primary.main',
    color: reversed ? 'primary.main' : '#fff',
    borderRadius: pillRadius,
    padding,
  });

  const outlinedSx: SxProps<Theme> = (theme) => ({
    ...(small
      ? theme.typography.outlineButtonSmall
      : theme.typography.outlineButton),
    borderRadius: pillRadius,
    padding: outlinedPadding,
    minHeight: small ? undefined : '40px',
    borderColor: theme.palette.custom.outline,
    color: 'primary.main',
    boxShadow: 'none',
    '&:hover': {
      borderColor: theme.palette.custom.outline,
      backgroundColor: 'primary.light',
      boxShadow: 'none',
    },
  });

  const sx = outlined ? outlinedSx : containedSx;
  const variant = outlined ? 'outlined' : 'contained';

  if (disabled) {
    return (
      <Button
        component="button"
        type="button"
        disabled
        variant={variant}
        data-testid={dataTestId}
        sx={sx}
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
        variant={variant}
        data-testid={dataTestId}
        sx={sx}
      >
        {children}
      </Button>
    );
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <Button component="a" variant={variant} data-testid={dataTestId} sx={sx}>
        {children}
      </Button>
    </Link>
  );
};
