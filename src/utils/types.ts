type Image = {
  path: string;
  alt: string;
  type?: string;
};

export type Programme = {
  name: string;
  link: Link;
  icon: string;
};

export type Link = {
  title?: string;
  uri: string;
  label: string;
};

export type Event = {
  title: string;
  type: string;
  host: string;
  speaker: string;
  date: string;
  endDate: number;
  description: string;
  link: Link;
  images: Image[];
};

export type LandingPageResponse = {
  heroSection: {
    title: string;
    description: string;
    images: Image[];
  };
  programmes: {
    title: string;
    description: string;
    items: Programme[];
  };
  eventsSection: {
    title: string;
    events: Event[];
  };
  announcementSection: {
    title: string;
    events: Event[];
  };
  volunteerSection: {
    title: string;
    description: string;
    link: string;
    images: Image[];
  };

  fullBannerSection: {
    title: string;
    description: string;
    images: Image[];
    link: Link;
  };
};

export type Network = {
  type: string;
  link: string;
};

export type FooterResponse = {
  title: string;
  subtitle: string;
  description: string;
  network: Network[];
  link: Link;
};

export type MentorshipPageProps = {
  mentorship: MentorshipProgrammeData;
  error: string | null;
};

export type MentorshipProgrammeData = {
  page: PageProps;
  mentorSection: MentorOrMenteeProps;
  menteeSection: MentorOrMenteeProps;
  feedback: FeedbackProps;
};

export type PageProps = {
  title: string;
  description: string;
};

export type LinkProps = {
  label: string;
  url: string;
};

export type MentorOrMenteeProps = {
  title: string;
  description: string;
  link: LinkProps;
  topics: string[];
};

export type FeedbackProps = {
  title: string;
  feedbacks: [
    {
      name: string;
      feedback: string;
      mentee: boolean;
      year: number;
    },
  ];
};
