// path: /mentorship/long-term-timeline

import { GetServerSideProps } from 'next';

import { TimelineCard, Title } from '@components';
import { LongTermTimeLineResponse, FooterResponse } from '@utils/types';
import { fetchData } from 'lib/api';

type CombinedResponse = {
  data: LongTermTimeLineResponse;
  footer: FooterResponse;
};

const MentorshipLongTermTimelinePage = ({ data }: CombinedResponse) => {
  return (
    <div>
      <Title title={'Long-Term Mentorship Timeline'} />

      {data?.events?.items?.map((item, index) => (
        <TimelineCard
          key={index}
          title={item.title}
          description={item.description}
          date={item.duration}
        />
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('mentorship/long-term-timeline');
    const props: CombinedResponse = {
      data: response.data,
      footer: response.footer,
    };
    return {
      props,
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

export default MentorshipLongTermTimelinePage;
