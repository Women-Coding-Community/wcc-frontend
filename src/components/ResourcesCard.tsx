import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

interface ResourcesCardProps {
  image: string;
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
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />

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
