// path: /mentorship/long-term-timeline

import { Title, TimelineCard } from '@components';

const MentorshipLongTermTimelinePage = () => {
  return (
    <>
      <Title title="Long-Term Mentorship Timeline" />
      <TimelineCard
        date="Month, YYYY - Month, YYYY"
        title="Timeline Title"
        description="Mentors can apply for Mentorship throughout the year. Once a profile has been approved and published on the website, the mentor will receive a confirmation email."
      />
      <TimelineCard
        date="Month, YYYY - Month, YYYY"
        title="Midpoint Check-In"
        description="test test"
      />
    </>
  );
};

export default MentorshipLongTermTimelinePage;
