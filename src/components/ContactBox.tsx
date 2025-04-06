import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { CSSProperties } from 'react';

import slackIconUrl from '@public/icons/slack-icon.svg';

import theme from '../theme';

interface ContactBoxProps {
  title: string;
  titleLink?: string;
  showIcon?: boolean;
  text?: string;
  children?: React.ReactNode;
  links?: Array<{ linkText: string; path: string; icon: React.ReactNode }>;
  titleStyle?: CSSProperties;
}

export const ContactBox: React.FC<ContactBoxProps> = ({
  title,
  titleLink,
  text,
  children,
  links,
  titleStyle,
  showIcon = false,
}) => {
  return (
    <Box
      sx={{
        width: '358px',
        bgcolor: 'primary.light',
        borderRadius: '12px',
        textAlign: 'left',
        padding: '24px',
        margin: '1px 15px',
        justifySelf: { xs: 'center' },
      }}
    >
      <Typography variant="h5" lineHeight={'36px'} marginBottom={'10px'}>
        {showIcon && (
          <Box display={'flex'} flexDirection="column" alignItems="flex-start">
            <Image
              src={slackIconUrl}
              alt="Slack Icon"
              data-testid="slack-icon"
              style={{ fontSize: 24 }}
            />
          </Box>
        )}
        {titleLink ? (
          <Link
            href={titleLink}
            style={{
              textDecoration: 'none',
              color: theme.palette.primary.main,
              ...titleStyle,
            }}
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </Typography>
      <Typography
        variant="body2"
        gap={'12px'}
        fontSize={'14px'}
        margin={'5px 0'}
      >
        {text}
      </Typography>
      {Array.isArray(links) &&
        links.map(({ linkText, path, icon }) => (
          <Link href={path} key={path} style={{ textDecoration: 'none' }}>
            <div style={{ gap: '6px', display: 'flex', alignItems: 'center' }}>
              <span data-testid="icon" style={{ fontSize: '24px' }}>
                {icon}
              </span>
              <span
                style={{
                  textDecoration: 'underline',
                  color: theme.palette.primary.main,
                }}
              >
                {linkText}
              </span>
            </div>
          </Link>
        ))}
      <div>{children}</div>
    </Box>
  );
};
