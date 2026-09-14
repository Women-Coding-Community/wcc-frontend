import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react';

import { FormattedImage, Image as ImageType } from '@utils/types';

interface ResourcesCardProps {
  image: FormattedImage | ImageType | string;
  title: string;
  description: string;
  buttonText?: string;
  link?: string;
  buttonIcon?: React.ReactNode;
}

export const ResourcesCard: React.FC<ResourcesCardProps> = ({
  image,
  title,
  description,
  buttonText = '',
  link = '#',
  buttonIcon,
}) => {
  const theme = useTheme();
  const imageSrc = typeof image === 'string' ? image : image.path;
  const imageAlt = typeof image === 'string' ? title : image.alt;

  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: 2,
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: 180 }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color={theme.palette.text.secondary}>
          {description}
        </Typography>
      </CardContent>

      <CardActions sx={{ paddingX: 2, paddingBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          target="_blank"
          rel="noopener noreferrer"
          href={link}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            fontWeight: 510,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            '&:hover': { backgroundColor: theme.palette.primary.dark },
          }}
        >
          {buttonText}
          {buttonIcon && (
            <Box component="span" sx={{ display: 'flex', ml: 1 }}>
              {buttonIcon}
            </Box>
          )}
        </Button>
      </CardActions>
    </Card>
  );
};
