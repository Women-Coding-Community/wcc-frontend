import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import XIcon from '@mui/icons-material/X';
import { Box, Card, Link, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import { Image as ProfileImage, Network } from '@utils/types';

export interface TeamMemberCardProps {
  fullName: string;
  position: string;
  jobTitle: string;
  images?: ProfileImage[];
  network?: Network[];
}

const FALLBACK_IMAGE = '/profile-illustration-female-fallback.jpg';

const socialNetworks = {
  linkedin: { Icon: LinkedInIcon, label: 'LinkedIn' },
  github: { Icon: GitHubIcon, label: 'GitHub' },
  twitter: { Icon: XIcon, label: 'X' },
  x: { Icon: XIcon, label: 'X' },
  website: { Icon: PublicIcon, label: 'Website' },
};

export const TeamMemberCard = ({
  fullName,
  position,
  jobTitle,
  images,
  network = [],
}: TeamMemberCardProps) => {
  const image = images?.[0];
  const [failedPath, setFailedPath] = useState<string>();
  const imageSrc =
    image?.path && image.path !== failedPath ? image.path : FALLBACK_IMAGE;
  const isFallbackImage = imageSrc === FALLBACK_IMAGE;

  return (
    <Card
      component="article"
      aria-label={`${fullName}, ${position}`}
      variant="outlined"
      sx={{
        width: '100%',
        maxWidth: { xs: 360, sm: 264 },
        minHeight: { xs: 466, sm: 405 },
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        overflowWrap: 'anywhere',
      }}
    >
      <Box
        sx={{
          flex: 1,
          px: '23px',
          pt: { xs: '35px', sm: '23px' },
          pb: { xs: '19px', sm: 3 },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Box
          sx={{
            width: { xs: 264, sm: 216 },
            maxWidth: '100%',
            mx: 'auto',
            mb: 2,
            aspectRatio: '1',
            borderRadius: '50%',
            bgcolor: 'grey.200',
            overflow: 'hidden',
            isolation: 'isolate',
          }}
        >
          <Image
            src={imageSrc}
            alt={
              isFallbackImage
                ? `Profile illustration for ${fullName}`
                : image?.alt || `${fullName}'s profile`
            }
            width={264}
            height={264}
            onError={() => setFailedPath(image?.path)}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              aspectRatio: '1',
              objectFit: 'cover',
              mixBlendMode: isFallbackImage ? 'multiply' : undefined,
            }}
          />
        </Box>
        <Typography
          component="h3"
          variant="inherit"
          sx={{ fontSize: 22, lineHeight: '28px', fontWeight: 500 }}
        >
          {fullName}
        </Typography>
        <Typography
          variant="inherit"
          sx={{ fontSize: 16, lineHeight: '24px', fontWeight: 500 }}
        >
          {position}
        </Typography>
        <Typography
          variant="inherit"
          sx={{
            mt: { xs: 2, sm: 1 },
            fontSize: 14,
            lineHeight: '20px',
            color: 'text.secondary',
          }}
        >
          {jobTitle}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 1,
          px: '23px',
          py: 1,
          minHeight: 42,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'custom.softGray',
        }}
      >
        {network.map(({ type, link }) => {
          const social = socialNetworks[
            type.toLowerCase() as keyof typeof socialNetworks
          ] || { Icon: PublicIcon, label: type };
          const { Icon, label } = social;

          return (
            <Link
              key={`${type}-${link}`}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${fullName} on ${label}`}
              sx={{
                display: 'inline-flex',
                color: 'primary.main',
                borderRadius: '2px',
                '&:focus-visible': {
                  outline: '2px solid currentColor',
                  outlineOffset: 2,
                },
              }}
            >
              <Icon sx={{ fontSize: 24 }} />
            </Link>
          );
        })}
      </Box>
    </Card>
  );
};
