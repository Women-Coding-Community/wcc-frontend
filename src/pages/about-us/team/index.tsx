// path: about-us/team/leadership

import { Box, Grid, useMediaQuery } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ContactUsCard, Footer } from '@components';
import { FooterResponse, TeamLeadershipResponse } from '@utils/types';
import { Section } from 'components/Section';
import { fetchData } from 'lib/api';
import theme from 'theme';

type CombinedResponse = {
  data: TeamLeadershipResponse;
  footer: FooterResponse;
};
interface TeamLeadershipProps {
  data: TeamLeadershipResponse;
  footer: FooterResponse;
  error: string | null;
}

const TeamLeadershipPage = ({ data, footer, error }: TeamLeadershipProps) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push('/500');
    }
  }, [error, router]);

  const isMobile = useMediaQuery(theme.breakpoints.down(750));
  const { page, contact } = data;
  return (
    <div>
      <Box
        sx={{
          height: '60vh',
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="left"
          alignItems="left"
          sx={{
            padding: '21px 16px 48px 16px',
            '@media (min-width: 600px)': { padding: '25px 16px' },
            maxWidth: isMobile ? '100%' : '1100px',
            margin: '0 auto',
          }}
          direction={isMobile ? 'column' : 'row'}
        >
          <Grid item xs={12} md={8}>
            <Section {...page} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ContactUsCard {...contact} />
          </Grid>
        </Grid>
      </Box>
      <Footer {...footer} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const combinedResponse: CombinedResponse = await fetchData('team');

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
export default TeamLeadershipPage;
