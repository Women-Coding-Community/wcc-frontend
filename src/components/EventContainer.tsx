import { EventData } from '../utils/types';

import { EventCard } from './EventCard';
import {Typography} from "@mui/material";

interface EventContainerProps extends EventData {}
export const EventContainer = ({ title, link, items }: EventContainerProps) => {
  console.log(`EventContainer events`, title, link, items);

  return (
    <>
      <Typography
      variant="h2"
      sx={{
        fontSize: '45px',
        fontWeight: 600,
          }}
        >
      {title}
      </Typography>
      <a href={link.uri}>{link.label}</a>
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
    </>
  );
};
