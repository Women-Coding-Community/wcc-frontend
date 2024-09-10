import { EventData } from '../utils/types';

import { EventCard } from './EventCard';

interface EventContainerProps extends EventData {}
export const EventContainer = ({ title, link, items }: EventContainerProps) => {
  console.log(`EventContainer events`, title, link, items);

  return (
    <>
      <h2>{title}</h2>
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
