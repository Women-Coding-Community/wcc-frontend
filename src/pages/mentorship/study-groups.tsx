// path: /mentorship/study-groups
import { GetServerSideProps } from 'next';
import React from 'react';

import { StudyGroupsInfoBlock } from 'components/StudyGroupsInfoBlock';
import { fetchData } from 'lib/api';

import { StudyGroupsPageData } from '../../utils/types';

export interface StudyGroupsPageProps {
  data: StudyGroupsPageData;
  error: string | null;
}

const MentorShipStudyGroupsPage = ({ data }: StudyGroupsPageProps) => {
  const {
    section: { description: introText },
    contact: { links: contactLinks },
  } = data;
  const cleanedIntroText = introText.replace(/\n /g, '\n\n');
  return (
    <div>
      <StudyGroupsInfoBlock introText={cleanedIntroText} contactLinks={contactLinks} />
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
