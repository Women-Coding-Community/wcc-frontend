// path: /mentorship/code-of-conduct

import { Box } from '@mui/material';

import { CodeOfConductSection } from 'components/CodeOfConduct';

import mentorshipCodeOfConduct from '../../lib/responses/mentorshipCodeOfConduct.json';

// TODO: this needs to be integrated with actual data fetching
const MentorshipCodeOfConductPage = () => {
  return (
    <Box sx={{ padding: '2rem' }}>
      {/* TODO: Hero Title Banner goes here */}
      <CodeOfConductSection
        title={mentorshipCodeOfConduct.menteeCodeSection.title}
        items={mentorshipCodeOfConduct.menteeCodeSection.items}
      />

      <CodeOfConductSection
        title={mentorshipCodeOfConduct.mentorCodeSection.title}
        items={mentorshipCodeOfConduct.mentorCodeSection.items}
      />
    </Box>
  );
};

export default MentorshipCodeOfConductPage;
