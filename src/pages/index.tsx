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
import { formatImage } from '@utils/image-utils';
import {
  FooterResponse,
  LandingPageResponse,
  MentorshipProgrammeData,
} from '@utils/types';
import { fetchData } from 'lib/api';

interface HomePageProps {
  data: LandingPageResponse;
  footer: FooterResponse;
  mentorship?: MentorshipProgrammeData | null;
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
      {mentorship?.feedbackSection?.feedbacks && (
        <FeedbackSection
          title={mentorship.feedbackSection.title}
          feedbacks={mentorship.feedbackSection.feedbacks}
        />
      )}
      <MentorBanner {...fullBannerSection} />
      <VolunteerSection {...volunteerSection} />
      <Footer {...footer} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [landingRes, mentorshipRes] = await Promise.all([
      fetchData('landingPage'),
      fetchData('mentorship/overview'),
    ]);
    const data = landingRes.data as LandingPageResponse;
    const footer = landingRes.footer;
    const mentorship = mentorshipRes.data as MentorshipProgrammeData;

    const formattedData = {
      ...data,
      heroSection: {
        ...data.heroSection,
        images: data.heroSection.images.map(formatImage),
      },
      fullBannerSection: {
        ...data.fullBannerSection,
        images: data.fullBannerSection.images.map(formatImage),
      },
      volunteerSection: {
        ...data.volunteerSection,
        images: data.volunteerSection.images.map(formatImage),
      },
      events: {
        ...data.events,
        items: data.events.items.map((event) => ({
          ...event,
          images: event.images.map(formatImage),
        })),
      },
    };

    return {
      props: {
        data: formattedData,
        footer,
        mentorship: mentorship ?? null,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        footer: null,
        mentorship: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    };
  }
};
export default HomePage;
