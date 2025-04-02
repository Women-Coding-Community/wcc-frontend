import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export interface GroupCardProps {
  title: string;
  description: string;
  participants?: number;
  tags?: boolean;
  tagText?: string;
  link?: string;
  mentor?: string;
  uri: string;
  bgColor: string;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  title,
  description,
  participants,
  tags,
  tagText,
  link,
  mentor,
  uri,
  bgColor,
}) => {
  return (
    <Card sx={{ backgroundColor: bgColor, borderRadius: 3, maxWidth: 400 }}>
      <Stack my={3}>
        {tags && (
          <Typography variant="body2" style={{ fontWeight: 600 }} mb={2} mx={2}>
            {tagText}
          </Typography>
        )}

        <Typography
          variant="h2"
          mx={2}
          sx={{ fontSize: '1.2rem', fontWeight: 600 }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          mx={2}
          mt={1.5}
          mb={4}
          sx={{ lineHeight: 1.4 }}
        >
          {description}
        </Typography>

        <Divider />
        <Box mt={2}>
          {tags ? (
            <Typography variant="body1" mx={2}>
              Related Link:{' '}
              <Link
                href={uri}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1A4B66' }}
              >
                {link || 'N/A'}
              </Link>
            </Typography>
          ) : (
            <Box>
              <Typography variant="body1" mx={2}>
                Mentor:{' '}
                <Link
                  href={uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1A4B66' }}
                >
                  {mentor || 'N/A'}
                </Link>
              </Typography>
              <Typography variant="body1" mx={2}>
                Participants: {participants ?? 'N/A'}
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Card>
  );
};
