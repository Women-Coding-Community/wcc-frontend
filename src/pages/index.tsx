import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Hero, OpportunitiesProgrammes, MentorBanner } from '@components';
import { LandingPageResponse } from '@utils/types';
import { EventContainer } from 'components/EventContainer';
import { fetchData } from 'lib/api';

type CombinedResponse = {
  data: LandingPageResponse | null;
  footer: LandingPageResponse;
  error?: string | null;
};

interface HomePageProps {
  data: LandingPageResponse;
  error: string | null;
}

const HomePage = ({ data, error }: HomePageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push('/500');
    }
  }, [error, router]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { heroSection, programmes, fullBannerSection, events } = data;

  return (
    <div>
      <Hero {...heroSection} />
      <OpportunitiesProgrammes {...programmes} />
      <EventContainer {...events} />
      <MentorBanner {...fullBannerSection} />
      {/* <Footer {...footer} /> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const combinedResponse: CombinedResponse = await fetchData('landingPage');

    return {
      props: {
        data: combinedResponse.data,
        error: null,
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
