import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  Hero,
  OpportunitiesProgrammes,
  MentorBanner,
  VolunteerSection,
  Footer,
  EventContainer,
  FeedbackSection,
} from '@components';
import {
  FooterResponse,
  LandingPageResponse,
  MentorshipProgrammeData,
} from '@utils/types';
import { fetchData, fetchMentorship } from 'lib/api';

interface HomePageProps {
  data: LandingPageResponse;
  footer: FooterResponse;
  mentorship: MentorshipProgrammeData;
  error: string | null;
}

const HomePage = ({ data, footer, mentorship, error }: HomePageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push('/500');
    }
  }, [error, router]);

  const {
    heroSection,
    programmes,
    fullBannerSection,
    volunteerSection,
    events,
  } = data;

  return (
    <>
      <Hero {...heroSection} />
      <OpportunitiesProgrammes {...programmes} />
      <EventContainer {...events} />
      <FeedbackSection
        title={mentorship.feedbackSection.title}
        feedbacks={mentorship.feedbackSection.feedbacks}
      />
      <MentorBanner {...fullBannerSection} />
      <VolunteerSection {...volunteerSection} />
      <Footer {...footer} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data, footer } = await fetchData('landingPage');
    const mentorship = await fetchMentorship();

    return {
      props: { data, footer, mentorship },
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
