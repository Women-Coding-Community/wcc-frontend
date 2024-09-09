import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  Hero,
  MentorshipProgramme,
  OpportunitiesProgrammes,
  MentorBanner,
  Footer,
} from '@components';
import { FooterResponse, LandingPageResponse } from '@utils/types';
import { fetchData } from 'lib/api';

type CombinedResponse = {
  data: LandingPageResponse;
  footer: FooterResponse;
  mentorship: any;
};

interface HomePageProps {
  data: LandingPageResponse;
  footer: FooterResponse;
  mentorship: any;
  error: string | null;
}

const HomePage = ({ data, footer, mentorship, error }: HomePageProps) => {
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
      <MentorshipProgramme {...mentorship} />
      <MentorBanner {...fullBannerSection} />
      <Footer {...footer} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const path = 'home.json'; // temporary setup to get correct json
  try {
    const combinedResponse: CombinedResponse = await fetchData(path);

    return {
      props: {
        data: combinedResponse.data,
        footer: combinedResponse.footer,
        mentorship: combinedResponse.mentorship,
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
