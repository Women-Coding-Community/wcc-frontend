// path: /mentorship

import { Typography, Grid, useMediaQuery } from '@mui/material';

import MentorBecomeCard from 'components/MentorBecomeCard';
import theme from 'theme';

const MentorshipPage = () => {
  return (
    <div>
      <Typography variant="h4">Welcome to the Mentorship Page</Typography>
      <Grid
        container
        style={{
          background: '#F6FAFE',
          padding: useMediaQuery(theme.breakpoints.down(544))
            ? '35px 15px'
            : '160px 80px',
        }}
      >
        <MentorBecomeCard
          mentorOrMentee="mentor"
          topics={[
            'Want to extend your professional network',
            'Want to contribute to the community',
            'You are ready to share expertise',
            'You want to get a new perspective and learn from your mentees',
          ]}
          buttonUrl="https://docs.google.com/forms/d/e/1FAIpQLSdtf7-upMp1m5kJ4MSpexS-UwGJHhACEW-yPoEQoROHi4kVcg/viewform"
          buttonText={'Join as a mentor'}
        ></MentorBecomeCard>
        <MentorBecomeCard
          mentorOrMentee="mentee"
          topics={[
            'Want to start a career in software engineering',
            'Want to find a better job',
            'Want to be promoted at work',
            'Want to apply for a leadership position',
            'Need support in advancing your career',
          ]}
          buttonUrl="/mentors"
          buttonText={'Find a mentor'}
        ></MentorBecomeCard>
      </Grid>
    </div>
  );
};

export default MentorshipPage;
