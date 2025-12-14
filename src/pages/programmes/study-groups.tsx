import { Box, Grid } from '@mui/material';
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
    <Box sx={{ padding: '2rem' }}>
      <Grid container spacing={3}>
        {groups.studyGroupSection.groups.map((group, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <GroupCard
              bgColor={group.bgColor}
              title={group.title}
              description={group.description}
              participants={group.participants}
              mentor={group.mentor}
              uri={group.uri}
            />
          </Grid>
        ))}
      </Grid>
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
