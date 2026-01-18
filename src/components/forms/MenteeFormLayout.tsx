import { Box, Container, Paper, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface MenteeFormLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const MenteeFormLayout: React.FC<MenteeFormLayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#C7E7FF',
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          right: { xs: 16, md: 0 },
          top: { xs: 16, md: '-231px' },
          width: { xs: '120px', sm: '180px', md: '1055.78px' },
          height: { xs: '120px', sm: '180px', md: '970px' },
          backgroundImage: 'url(/mentee-form-bg.png)',
          backgroundSize: { xs: 'cover', md: 'contain' },
          backgroundPosition: { xs: 'center', md: 'center right' },
          backgroundRepeat: 'no-repeat',
          borderRadius: { xs: '50%', md: 0 },
          zIndex: 0,
          opacity: 1,
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-start' },
          alignItems: 'flex-start',
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3, md: '157px' },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: { xs: '100%', sm: '90%', md: '744px' },
            maxWidth: '744px',
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            backgroundColor: 'white',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography
                variant="caption"
                sx={{ color: 'error.main', mr: 0.5 }}
              >
                *
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Indicates a required field
              </Typography>
            </Box>
            {description && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                {description}
              </Typography>
            )}
          </Box>
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default MenteeFormLayout;
