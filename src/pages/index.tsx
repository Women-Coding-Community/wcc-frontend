import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Hero, OpportunitiesProgrammes } from '@components';
import { LandingPageResponse } from '@utils/types';
import { MentorBanner } from 'components/MentorBanner';
import { fetchData } from 'lib/api';

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

  const { heroSection, programmesSection, fullBannerSection } = data;

  return (
    <div>
      <Hero {...heroSection} />
      <OpportunitiesProgrammes {...programmesSection} />
      <MentorBanner {...fullBannerSection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const path = 'home.json'; // temporary setup to get correct json
  try {
    const data: LandingPageResponse = await fetchData(path);

    return {
      props: {
        data,
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
