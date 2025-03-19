import { Box, Typography, useMediaQuery } from '@mui/material';

import theme from 'theme';

type TextContentProps = {
  title: string;
  description: string;
};
export const TextContent = ({ title, description }: TextContentProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down(750));
  return (
    <Box textAlign="left" marginRight={isMobile ? '' : '52px'}>
      <Typography
        variant="h3"
        color="text.primary"
        align="left"
        sx={{
          fontWeight: { xs: 600, md: 'bold' },
          fontSize: { xs: '45px', sm: '45px' },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        color={theme.palette.primary.dark}
        sx={{
          marginY: 2,
          fontSize: '1rem',
          fontWeight: '500',
          lineHeight: '1.2',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};
