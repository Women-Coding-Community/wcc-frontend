import { Typography, useMediaQuery, Box } from '@mui/material';

import theme from '../theme';
import { EventData } from '../utils/types';

import { EventCard } from './EventCard';

interface EventContainerProps extends EventData {}
export const EventContainer = ({ title, link, items }: EventContainerProps) => {
  console.log(`EventContainer events`, title, link, items);

  const isMobile = useMediaQuery(theme.breakpoints.down(750));

  return (
    <>
      <Box
        sx={{
          background: '#F6FAFE',
          width: '100%',
          padding: '40px 16px',
        }}
      >
        <Box
          sx={{
            maxWidth: '1128px',
            margin: '0 auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '16px',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: isMobile ? '28px' : '45px',
                fontWeight: isMobile ? '500' : '600',
                textAlign: 'left',
              }}
            >
              {title}
            </Typography>
            <a href={link.uri} style={{ textAlign: 'right', fontSize: '16px', textDecoration: 'none', color: '#1A4B66' }}>
              {link.label}
            </a>
          </Box>
          {items.map((event, index) => {
            const {
              title,
              description,
              startDate,
              endDate,
              eventType,
              speakerProfile,
              eventLink,
              images,
            } = event;
            const date = `${startDate} - ${endDate}`;
            const speaker = speakerProfile.label;

            return (
              <EventCard
                key={index}
                title={title}
                speaker={speaker}
                date={date}
                description={description}
                link={eventLink}
                images={images}
                type={eventType}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
};
