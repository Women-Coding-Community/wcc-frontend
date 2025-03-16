import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React, { CSSProperties } from 'react';

import SlackIcon from '@public/icons/slack-icon.svg';

interface ContactBoxProps {
  title: string;
  titleLink?: string;
  // titleIcon?: React.ReactNode;
  text?: string;
  children?: React.ReactNode;
  links?: Array<{ linkText: string; path: string; icon: React.ReactNode }>;
  titleStyle?: CSSProperties;
  // boxStylePosition: CSSProperties;
}

export const ContactBox: React.FC<ContactBoxProps> = ({
  title,
  titleLink,
  // titleIcon,
  text,
  children,
  links,
  titleStyle,
  // boxStylePosition,
}) => {
  return (
    <Box
      sx={{
        maxWidth: '358px',
        // height: 304,
        bgcolor: 'primary.light',
        borderRadius: '12px',
        textAlign: 'left',
        padding: '24px',
        // gap: '32px',
        border: '2px solid red',
        margin: '1px 15px',
        // ...boxStylePosition,
      }}
    >
      <SlackIcon />
      <Typography variant="h5" lineHeight={'36px'}>
        {titleLink ? (
          <Link
            href={titleLink}
            style={{
              textDecoration: 'none',
              color: 'primary.main', // Style not applying
              ...titleStyle,
            }}
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </Typography>
      <Typography>{text}</Typography>
      {Array.isArray(links) &&
        links.map(({ linkText, path, icon }) => (
          <Link href={path} key={path} style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '24px', paddingRight: '3px' }}>
              {icon}
            </span>
            <span
              style={{
                textDecoration: 'underline',
                color: '#1A4B66',
                paddingLeft: '3px',
              }}
            >
              {linkText}
            </span>
          </Link>
        ))}
      {children}
    </Box>
  );
};
