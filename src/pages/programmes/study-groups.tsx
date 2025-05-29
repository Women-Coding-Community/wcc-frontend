import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

import { GroupCard } from '@components';
import { OurProgrammesData } from '@utils/types';
import { fetchData } from 'lib/api';

interface StudyGroupsPageProps {
  groups: OurProgrammesData;
}

const StudyGroupsPage: FC<StudyGroupsPageProps> = ({ groups }) => {
  return (
    <Box>
      {groups.studyGroupSection.groups.map((group, i) => (
        <GroupCard
          key={i}
          bgColor={group.bgColor}
          title={group.title}
          description={group.description}
          participants={group.participants}
          mentor={group.mentor}
          uri={group.uri}
        />
      ))}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('programmes/study-groups');

    return {
      props: {
        groups: response.data,
      },
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

export default StudyGroupsPage;
