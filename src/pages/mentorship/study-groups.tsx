// path: /mentorship/study-groups
import { Typography } from '@mui/material';
import { StudyGroupsHero } from '../../components/StudyGroupHero';
import { Footer } from '@components';
import footerData from '../../lib/responses/footer.json';

const MentorShipStudyGroupsPage = ({ data }: StudyGroupsPageProps) => {
  return (
    <div>
      <StudyGroupsHero
        title="Technical Study Groups"
        imageSrc="/hero-img.jpg"
      />
      <Typography
        variant="h4"
        sx={{ padding: '20px 16px', textAlign: 'center' }}
      >
        Welcome to the MentorShipStudyGroupsPage
      </Typography>
      <Footer {...footerData} />
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
