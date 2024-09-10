// path: /mentorship
import { GetServerSideProps } from 'next';

import { MentorshipPageProps } from '@utils/types';
import { fetchData } from 'lib/api';

const MentorshipPage = ({ mentorship }: MentorshipPageProps) => {
  return <div>{JSON.stringify(mentorship)}</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const combinedResponse = await fetchData('mentorship/overview');

    return {
      props: {
        mentorship: combinedResponse.data,
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

export default MentorshipPage;
