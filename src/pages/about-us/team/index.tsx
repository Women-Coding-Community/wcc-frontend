// path: about-us/team/leadership

import { Typography } from '@mui/material';

import { ContactBox } from 'components/ContactBox';

const fakeData = {
  title: 'Contact US',
  links: [
    { linkText: 'website', path: 'https://mui.com/material-ui/', icon: '🙌' },
  ],
};

const TeamLeadershipPage = () => {
  return (
    <div>
      <Typography variant="h4">Welcome to the TeamPage</Typography>
      <ContactBox title={fakeData.title} links={fakeData.links}></ContactBox>
    </div>
  );
};

export default TeamLeadershipPage;
