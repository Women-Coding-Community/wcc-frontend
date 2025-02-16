import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface ContactBoxProps {
  // titleLink is the href for the title
  title: string;
  titleLink?: string;
  titleIcon?: React.ReactNode;
  text?: string;
  children?: React.ReactNode;
  // links are for links to  email, slack etc
  links?: Array<{ linkText: string; path: string; icon: React.ReactNode }>;
}

export const ContactBox: React.FC<ContactBoxProps> = ({
  title,
  titleLink,
  titleIcon,
  text,
  children,
  links,
}) => {
  return (
    <Box
      sx={{ width: 150, height: 100, bgcolor: '#F6FAFE', borderRadius: '12px' }}
    >
      {titleIcon}
      <Typography variant="h5">
        {titleLink ? <Link href={titleLink}>{title}</Link> : title}
      </Typography>
      <Typography>{text}</Typography>
      {Array.isArray(links) &&
        links.map(({ linkText, path, icon }) => (
          <Link href={path} key={path}>
            {icon}
            {linkText}
          </Link>
        ))}
      {children}
    </Box>
  );
};
