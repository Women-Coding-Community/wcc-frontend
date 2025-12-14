import { Box, Card, Divider, Stack, Typography, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const linkColor = theme.palette.custom.linkBlue;

  return (
    <Card
      sx={{
        backgroundColor: bgColor,
        borderRadius: theme.custom.groupCard.borderRadius,
        width: theme.custom.groupCard.width,
        height: theme.custom.groupCard.height,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack
        my={3}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {tags && (
          <Typography variant="body2" style={{ fontWeight: 600 }} mb={2} mx={2}>
            {tagText}
          </Typography>
        )}

        <Typography
          mx={2}
          sx={{
            fontSize: theme.custom.groupCard.typography.title.fontSize,
            fontWeight: theme.custom.groupCard.typography.title.fontWeight,
            lineHeight: theme.custom.groupCard.typography.title.lineHeight,
          }}
        >
          {title}
        </Typography>

        <Typography
          mx={2}
          mt={1.5}
          mb={2}
          sx={{
            fontSize: theme.custom.groupCard.typography.description.fontSize,
            fontWeight:
              theme.custom.groupCard.typography.description.fontWeight,
            lineHeight:
              theme.custom.groupCard.typography.description.lineHeight,
            flex: 1,
            overflow: 'auto',
          }}
        >
          {description}
        </Typography>

        <Divider sx={{ mt: 'auto' }} />
        <Box mt={2}>
          {tags ? (
            <Typography
              mx={2}
              sx={{
                fontSize: theme.custom.groupCard.typography.metadata.fontSize,
                fontWeight:
                  theme.custom.groupCard.typography.metadata.fontWeight,
                lineHeight:
                  theme.custom.groupCard.typography.metadata.lineHeight,
              }}
            >
              Related Link:{' '}
              <Link
                href={uri}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: linkColor }}
              >
                {link || 'N/A'}
              </Link>
            </Typography>
          ) : (
            <Box>
              <Typography
                mx={2}
                sx={{
                  fontSize: theme.custom.groupCard.typography.metadata.fontSize,
                  fontWeight:
                    theme.custom.groupCard.typography.metadata.fontWeight,
                  lineHeight:
                    theme.custom.groupCard.typography.metadata.lineHeight,
                }}
              >
                Mentor:{' '}
                <Link
                  href={uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: linkColor }}
                >
                  {mentor || 'N/A'}
                </Link>
              </Typography>
              <Typography
                mx={2}
                sx={{
                  fontSize: theme.custom.groupCard.typography.metadata.fontSize,
                  fontWeight:
                    theme.custom.groupCard.typography.metadata.fontWeight,
                  lineHeight:
                    theme.custom.groupCard.typography.metadata.lineHeight,
                }}
              >
                Participants: {participants ?? 'N/A'}
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Card>
  );
};
