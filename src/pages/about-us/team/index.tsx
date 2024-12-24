// path: about-us/team/leadership

import { Typography } from '@mui/material';
import { GetServerSideProps } from 'next';

// import { TeamCoreData, TeamContactData, TeamMembersData } from '@utils/types';
import { TeamApiResponse } from '@utils/types';
import { fetchData } from 'lib/api';

interface TeamPageProps {
  team: TeamApiResponse;
}

const TeamLeadershipPage = ({ team }: TeamPageProps) => {
  const { membersByType } = team;
  return (
    <div>
      {membersByType.directors.map((director) => (
        <span key={director.fullName}>{director.fullName}</span> //Example how to use the data
      ))}
      <Typography variant="h4">Welcome to the TeamPage</Typography>
    </div>
  );
};

export default TeamLeadershipPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('team');
    const props: TeamPageProps = {
      team: response.data,
    };
    return {
      props,
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    };
  }
};
