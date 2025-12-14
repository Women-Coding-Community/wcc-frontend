// path: /mentorship/study-groups
import { Box, Grid, useTheme } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

import { GroupCard } from '@components';
import { fetchData } from 'lib/api';

import { InfoWithContact } from '../../components/InfoWithContact';
import { StudyGroupsPageData } from '../../utils/types';

export interface StudyGroupsPageProps {
  data: StudyGroupsPageData;
  error: string | null;
}

const MentorShipStudyGroupsPage = ({ data }: StudyGroupsPageProps) => {
  const muiTheme = useTheme();
  const cardColors = muiTheme.palette.custom.studyGroupCardColors;

  return (
    <Box sx={{ padding: { xs: '1rem', sm: '2rem' } }}>
      <Grid container spacing={3} justifyContent="center">
        {data.studyGroupSection.items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <GroupCard
                bgColor={cardColors[index % cardColors.length]}
                title={item.title}
                description={item.description}
                participants={item.participants}
                mentor={item.coordinators}
                uri={item.link.uri}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
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
