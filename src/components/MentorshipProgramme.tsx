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

export const MentorshipProgramme = ({
  page,
  menteeSection,
  mentorSection,
  feedback,
}: MentorshipProgrammeData) => {
  return (
    <>
      {JSON.stringify({
        page,
        menteeSection,
        mentorSection,
        feedback,
      })}
    </>
  );
};
