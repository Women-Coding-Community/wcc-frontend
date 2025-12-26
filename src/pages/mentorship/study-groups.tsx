// path: /mentorship/study-groups
import { Typography } from '@mui/material';
import { GetServerSideProps } from 'next';

import { HeroWithImage, Footer } from '@components';

import { fetchData } from '../../lib/api';

interface StudyGroupsPageProps {
  data: {
    id: number;
    name: string;
    description: string;
  };
  footer: any;
}

const MentorShipStudyGroupsPage = ({ footer }: StudyGroupsPageProps) => {
  return (
    <div>
      <HeroWithImage title="Technical Study Groups" imageSrc="/hero-img.jpg" />
      <Typography
        variant="h4"
        sx={{ padding: '20px 16px', textAlign: 'center' }}
      >
        Welcome to the MentorShipStudyGroupsPage
      </Typography>
      <Footer {...footer} />
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
