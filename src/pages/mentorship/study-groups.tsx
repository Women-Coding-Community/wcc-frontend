// path: /mentorship/study-groups
import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';

import { HeroWithImage, Footer } from '@components';

import { fetchData } from '../../lib/api';
import { InfoWithContact } from '../../components/InfoWithContact';
import { StudyGroupsPageData } from '../../utils/types';

interface StudyGroupsPageProps {
  data: {
    id: number;
    name: string;
    description: string;
  };
  footer: any;
}

const MentorShipStudyGroupsPage = ({ data }: StudyGroupsPageProps) => {
  const {
    section: { description: introText },
    contact: { links: contactLinks },
  } = data;
  const cleanedIntroText = introText.replace(/\n /g, '\n\n');
  return (
    <Box
      sx={{
        maxWidth: '1128px',
        mx: 'auto',
        pt: 4,
      }}
    >
      <InfoWithContact
        introText={cleanedIntroText}
        contactLinks={contactLinks}
        title="How it works"
        calltoAction="Join us in our Study Group Slack Channel"
      />
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
