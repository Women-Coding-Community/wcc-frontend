// path: /mentorship/study-groups
import { Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

import { fetchData } from 'lib/api';

import { StudyGroupsPageData } from '../../utils/types';

export interface StudyGroupsPageProps {
  data: StudyGroupsPageData;
  error: string | null;
}

const MentorShipStudyGroupsPage = ({ data }: StudyGroupsPageProps) => {
  return (
    <div>
      <Typography variant="h4">Study Groups</Typography>
      {data ? <p> Data Loaded </p> : <p> No Data </p>}
    </div>
  );
};

export default MentorShipStudyGroupsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const combinedResponse = await fetchData('mentorship-study-groups-page');

    return {
      props: {
        data: combinedResponse.data,
        error: null,
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching Study Groups data:', error);
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};
