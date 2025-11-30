// path: /mentorship/mentors

import { Box, Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Footer, MentorProfileCard } from '@components';
import { useIsMobile } from '@utils/theme-utils';
import { FooterResponse, Mentor } from '@utils/types';
import { fetchData } from 'lib/api';
import theme from 'theme';

type CombinedResponse = {
  data: MentorsPageProps;
  footer: FooterResponse;
};

interface MentorsPageProps {
  data: any; // Replace with the actual type
  footer: FooterResponse;
  error: string | null;
}

const MentorsPage = ({ data, footer, error }: MentorsPageProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (error) {
      router.push('/500');
    }
  }, [error, router]);

  const { mentors } = data;

  return (
    <>
      <Box sx={theme.custom.containerBox}>
        <Grid
          container
          spacing={0}
          justifyContent="center"
          alignItems="center"
          sx={{
            padding: '21px 16px 48px 16px',
            maxWidth: isMobile ? '100%' : '1128px',
            margin: '0 auto',
          }}
          direction={isMobile ? 'column' : 'row'}
        >
          {mentors.map((mentor: Mentor) => (
            <MentorProfileCard mentor={mentor} key={mentor.fullName} />
          ))}
        </Grid>
      </Box>
      <Footer {...footer} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const combinedResponse: CombinedResponse =
      await fetchData('mentorship/mentors');

    return {
      props: {
        data: combinedResponse.data,
        footer: combinedResponse.footer,
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

export default MentorsPage;
