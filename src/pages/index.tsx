import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  Hero,
  OpportunitiesProgrammes,
  MentorBanner,
  Footer,
} from '@components';
import { FooterResponse, LandingPageResponse } from '@utils/types';
import { EventContainer } from 'components/EventContainer';
import { fetchData } from 'lib/api';
import theme from 'theme';

type CombinedResponse = {
  data: LandingPageResponse;
  footer: FooterResponse;
};

interface HomePageProps {
  data: LandingPageResponse;
  footer: FooterResponse;
  error: string | null;
}

const HomePage = ({ data, footer, error }: HomePageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push('/500');
    }
  }, [error, router]);

  const { heroSection, programmes, fullBannerSection, events } = data;

  return (
    <Box sx={theme.custom.containerBox}>
      <Hero {...heroSection} />
      <OpportunitiesProgrammes {...programmes} />
      <EventContainer {...events} />
      <MentorBanner {...fullBannerSection} />
      <Footer {...footer} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const combinedResponse: CombinedResponse = await fetchData('landingPage');
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
export default HomePage;
