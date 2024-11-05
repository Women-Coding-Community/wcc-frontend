import { GetServerSideProps } from 'next';

import { MentorshipProgrammeData } from '@utils/types';
import { fetchData } from 'lib/api';

import { FeedbackSection } from './feedback-section';

interface MentorshipPageProps {
  mentorship: MentorshipProgrammeData;
  error: string | null;
}

const MentorshipPage = ({ mentorship }: MentorshipPageProps) => {
  return (
    <div>
      <FeedbackSection
        title={mentorship.feedbackSection.title}
        feedbacks={mentorship.feedbackSection.feedbacks}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('mentorship/overview');

    return {
      props: {
        mentorship: response.data,
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
