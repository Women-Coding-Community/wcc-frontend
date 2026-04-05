import { Button, type SxProps, type Theme } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type LinkButtonProps = {
  href: string;
  reversed?: boolean;
  outlined?: boolean;
  small?: boolean;
  children: React.ReactNode;
};

const pillRadius = '100px';

export const LinkButton = ({
  href,
  reversed,
  outlined,
  small,
  children,
}: LinkButtonProps) => {
  const isExternal = href.startsWith('https');

  const padding = small ? '7px 16px' : '10px 32px';

  if (outlined) {
    const outlinedPadding = small ? '7px 16px' : '10px 24px';
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

    if (isExternal) {
      return (
        <Button
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          sx={outlinedSx}
        >
          {children}
        </Button>
      );
    }

    return (
      <Link href={href} passHref legacyBehavior>
        <Button component="a" variant="outlined" sx={outlinedSx}>
          {children}
        </Button>
      </Link>
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
        sx={(theme) => ({
          ...(small
            ? theme.typography.linkButtonContainedSmall
            : theme.typography.linkButtonContained),
          backgroundColor: reversed ? '#fff' : 'primary.main',
          color: reversed ? 'primary.main' : '#fff',
          borderRadius: pillRadius,
          padding,
        })}
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
        sx={(theme) => ({
          ...(small
            ? theme.typography.linkButtonContainedSmall
            : theme.typography.linkButtonContained),
          backgroundColor: reversed ? '#fff' : 'primary.main',
          color: reversed ? 'primary.main' : '#fff',
          borderRadius: pillRadius,
          padding,
        })}
      >
        {children}
      </Button>
    </Link>
  );
};
