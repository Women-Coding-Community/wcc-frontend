import { GetServerSideProps } from 'next';

import { ErrorPageComponent, TeamSection } from '@components';
import { TeamApiResponse } from '@utils/types';
import { fetchData } from 'lib/api';

interface TeamPageProps {
  team: TeamApiResponse | null;
}

const TeamLeadershipPage = ({ team }: TeamPageProps) => {
  if (!team?.membersByType) {
    return <ErrorPageComponent title="Unable to load the team" />;
  }

  return <TeamSection membersByType={team.membersByType} />;
};

export default TeamLeadershipPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('team');
    const props: TeamPageProps = {
      team: response.data ?? null,
    };
    return {
      props,
    };
  } catch {
    return {
      props: {
        team: null,
      },
    };
  }
};
