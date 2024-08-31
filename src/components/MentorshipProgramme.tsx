import axios from 'axios';
import { useEffect, useState } from 'react';

interface PageProps {
  title: string;
  description: string;
}

interface LinkProps {
  label: string;
  url: string;
}
interface MentorOrMenteeProps {
  title: string;
  description: string;
  link: LinkProps;
  topics: string[];
}

interface FeedbackProps {
  title: string;
  feedbacks: [
    {
      name: string;
      feedback: string;
      mentee: boolean;
      year: number;
    },
  ];
}

interface MentorshipProgrammeData {
  page: PageProps;
  mentorSection: MentorOrMenteeProps;
  menteeSection: MentorOrMenteeProps;
  feedback: FeedbackProps;
}

export const MentorshipProgramme = () => {
  const [data, setData] = useState<MentorshipProgrammeData | null>(null);

  useEffect(() => {
    async function getMentorshipProgrammeData() {
      try {
        const response = await axios.get<MentorshipProgrammeData>(
          'https://wcc-backend.fly.dev/api/cms/v1/mentorship/overview',
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch mentorship programme data');
      }
    }
    getMentorshipProgrammeData();
  }, []);
  return <>{data ? JSON.stringify(data) : 'Loading...'}</>;
};
