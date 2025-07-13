import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Typography, useMediaQuery, Box, Link } from '@mui/material';

import theme from '../theme';
import { EventData } from '../utils/types';

import { EventCard } from './EventCard';
import { GradientBorderDivider } from './GradientBorderDivider';

interface EventContainerProps extends EventData {}
export const EventContainer = ({ title, link, items }: EventContainerProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down(750));

  return (
    <Box sx={theme.custom.containerBox}>
      <Box sx={theme.custom.innerBox}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
          }}
        >
          <Typography variant="h3">{title}</Typography>
          <Link
            href={link.uri}
            underline="none"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 16,
              fontWeight: 500,
              color: '#1A4B66',
              gap: '5px',
              letterSpacing: '0.15px',
              ml: isMobile ? 0 : 2,
              mt: isMobile ? 2 : 0,
              alignSelf: isMobile ? 'flex-start' : 'center',
            }}
          >
            {link.label}
            <ArrowCircleRightOutlinedIcon sx={{ color: '#1A4B66' }} />
          </Link>
        </Box>
        <GradientBorderDivider
          height="0.5rem"
          width="100%"
          margin={isMobile ? '8px auto 30px' : '13px auto 39px'}
          gradientColors="linear-gradient(90deg, #C7E7FF 0%, #FFDEA6 100%)"
        />
        <Box
          sx={{
            display: 'grid',
            gap: isMobile ? '20px' : '40px',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            width: '100%',
          }}
        >
          {items.map((event) => {
            const endTime = event.endDate.split(', ').slice(-1)[0];
            const date = `${event.startDate} - ${endTime}`;
            return (
              <EventCard
                key={`${event.title}-${event.startDate}`}
                title={event.title}
                speaker={event.speakerProfile.label}
                date={date}
                description={event.description}
                link={event.eventLink}
                images={event.images}
                type={event.eventType}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
