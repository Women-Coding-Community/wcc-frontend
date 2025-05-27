import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import Link from 'next/link';

import theme from 'theme';

interface LinkButtonProps extends ButtonProps {
  href: string;
  reversed?: boolean;
  external?: boolean;
}

function isSafeExternalUrl(url: string) {
  try {
    const parsed = new URL(url, 'https://dummy.base'); // base for relative URLs
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export const LinkButton = ({
  href,
  external = false,
  reversed = false,
  children,
}: LinkButtonProps) => {
  if (external) {
    if (!isSafeExternalUrl(href)) {
      return null;
    }
    return (
      <Button
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          backgroundColor: reversed
            ? theme.palette.common.white
            : theme.palette.primary.main,
          height: '48px',
          width: 'max-content',
          gap: '8px',
          borderRadius: '100px',
          color: reversed
            ? theme.palette.primary.main
            : theme.palette.common.white,
          fontWeight: theme.typography.fontWeightBold,
          textAlign: 'center',
          lineHeight: '20px',
          letterSpacing: '0.1px',
          textTransform: 'none',
          padding: '0 16px',
        }}
      >
        {children}
      </Button>
    );
  }
  return (
    <Button
      component={Link}
      href={href}
      sx={{
        backgroundColor: reversed
          ? theme.palette.common.white
          : theme.palette.primary.main,
        height: '48px',
        width: '163.92px',
        gap: '8px',
        borderRadius: '100px',
        color: reversed
          ? theme.palette.primary.main
          : theme.palette.common.white,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '14px',
        textAlign: 'center',
        lineHeight: '20px',
        letterSpacing: '0.1px',
        textTransform: 'none',
        padding: 0,
      }}
    >
      {children}
    </Button>
  );
};
