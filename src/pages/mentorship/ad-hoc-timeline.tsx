// path: /mentorship/ad-hoc-timeline

import { Typography } from '@mui/material';
import { GetServerSideProps } from 'next';

import { AdHocTimeLineResponse, FooterResponse } from '@utils/types';
import { fetchData } from 'lib/api';

type CombinedResponse = {
  data: AdHocTimeLineResponse;
  footer: FooterResponse;
};

const MentorshipAdHocTimelinePage = ({ data }: CombinedResponse) => {
  return (
    <div>
      <Typography variant="h4">Welcome to the Ad-Hoc Timeline Page</Typography>
      {data ? <p> Data Loaded </p> : <p> No Data </p>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('mentorship/ad-hoc-timeline');
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

export default MentorshipAdHocTimelinePage;
