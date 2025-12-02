// path: /mentorship/ad-hoc-timeline

import { Typography } from '@mui/material';
import { GetServerSideProps } from 'next';

import { LongTermTimeLineResponse, FooterResponse } from '@utils/types';
import { fetchData } from 'lib/api';

type CombinedResponse = {
  data: LongTermTimeLineResponse;
  footer: FooterResponse;
};

const MentorshipLongTermTimelinePage = ({ data }: CombinedResponse) => {
  return (
    <div>
      <Typography variant="h4">
        Welcome to the Long Term Timeline Page
      </Typography>
      {data ? <p> Data Loaded </p> : <p> No Data </p>}
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
