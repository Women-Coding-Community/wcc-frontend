import { Box, Card, CardContent, Typography } from '@mui/material';

import { useIsMobile } from '@utils/theme-utils';

interface TimelineCardProps {
  title: string;
  description: string;
  date?: string;
}

export const TimelineCard = (props: TimelineCardProps) => {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: isMobile ? '300px' : '1440px',
        margin: '0 auto',
        padding: {
          xs: '16px',
          sm: '24px',
          md: '32px',
        },
      }}
    >
      <Card
        variant="outlined"
        sx={{
          boxSizing: 'border-box',
          borderRadius: 1,
          borderColor: '#C1C7CE',
          width: '100%',
          maxWidth: isMobile ? '300px' : '1050px',
          minHeight: isMobile ? '226px' : '275px',
          opacity: 1,
          padding: {
            xs: '24px',
            sm: '32px',
            md: '38px 62px',
          },
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          backgroundColor: '#FFF',
          margin: '0 auto',
        }}
      >
        <CardContent>
          <Typography
            variant={isMobile ? 'subtitle1' : 'h5'}
            gutterBottom
            fontWeight="bold"
          >
            {props.date}
          </Typography>
          <Typography
            variant={isMobile ? 'h6' : 'h4'}
            gutterBottom
            sx={{
              fontWeight: 600,
            }}
          >
            {props.title}
          </Typography>
          <Typography
            variant={isMobile ? 'subtitle2' : 'h6'}
            fontWeight="medium"
          >
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
